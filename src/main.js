const PLUGIN_NAME = 'VueNotifications'
const PACKAGE_NAME = 'vue-notifications'
const PROPERTY_NAME = 'notifications'

const TYPE = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  success: 'success'
}

const VUE_VERSION = {
  evangelion: 1,
  ghostInTheShell: 2
}

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`,
  methodNameConflict: `${PLUGIN_NAME}: names conflict - `
}

const innerMethods = {
  /**
   * @param  {Object} Vue
   * @return {Object}
   */
  getVersion  (Vue) {
    const version = Vue.version.match(/(\d+)/g)
    return {
      major: +version[0],
      regular: +version[1],
      minor: +version[2]
    }
  },

  /**
   * @param  {String} msg
   * @param  {String} type
   * @param  {Object} types
   */
  showInConsole  (msg, type, types) {
    if (type === types.error) console.error(msg)
    else if (type === types.warn) console.warn(msg)
    else if (type === types.success) console.info(msg)
    else console.log(msg)
  },

  /**
   * @param  {String} type
   * @param  {String} message
   * @param  {String} title
   * @param  {String} debugMsg
   * @param  {Object} vueApp
   * @return  {String}
   */
  showDefaultMessage  ({ type, message, title, debugMsg }, vueApp) {
    let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}, type: ${type}`

    innerMethods.showInConsole(msg, type, TYPE)

    return msg
  },
  /**
   * @param  {Object} elem
   */
  clearFn  (elem) {
    elem.innerText = ''
  },
  /**
   * @param  {String} id
   * @param  {String} type
   * @param  {String} timeout
   * @param  {String} title
   * @param  {String} message
   * @param  {Function} computed // TODO (S.Panfilov) or not fn?
   * @param  {String} debugMsg
   * @param  {Function} cb
   * @param  {Object} vueApp
   * @return  {String}
   */
  showInlineMessage  ({ id, type, timeout, title, message, computed, debugMsg, cb }, vueApp) {
    // TODO (S.Panfilov) handle class add and remove here
    if (debugMsg) innerMethods.showInConsole(debugMsg, type, TYPE)
    const elem = document.getElementById(id)

    let msg = message
    if (title) msg = `${title}: ${msg}`

    elem.innerText = msg

    if (timeout && !computed) {
      setTimeout(() => {
        innerMethods.clearFn.call(vueApp, elem)
      }, timeout)
    } else {
      // TODO (S.Panfilov) Computed property doesn't work yet
      // const interval = setInterval(() => {
      // console.info(computed)
      // if (!computed) clearInterval(interval)
      // }, 50)
    }

    // TODO (S.Panfilov) BUG: Weird behaviour: cb calls 2 times
    console.warn(this)
    if (cb) {
      // TODO (S.Panfilov) bug here
      cb.call(vueApp, elem, () => innerMethods.clearFn.call(innerMethods, elem))
    }

    return msg
  },

  /**
   * @param  {Object} vueApp
   * @param  {Object} config
   * @return {Object}
   */
  getValues  (vueApp, config) {
    const result = {}

    Object.keys(config).forEach(field => {
      if (field !== 'cb') {
        result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
      } else {
        console.info(vueApp)
        result[field] = config[field].bind(vueApp)
      }
    })

    return result
  },

  /**
   * @param  {Object} config
   * @param  {Object} options
   * @param  {Object} vueApp
   */
  showMessage  (config, options, vueApp) {
    const valuesObj = innerMethods.getValues(vueApp, config)
    const isLinkedToElem = !!valuesObj.id

    if (isLinkedToElem) {
      innerMethods.showInlineMessage(valuesObj, vueApp)
    } else {
      const isMethodOverridden = options && options[valuesObj.type]
      const method = isMethodOverridden ? options[valuesObj.type] : innerMethods.showDefaultMessage
      method(valuesObj, vueApp)
    }

    if (config.cb) return config.cb()
  },

  /**
   * @param {Object} targetObj
   * @param {Object} typesObj
   * @param {Object} options
   * @return {undefined}
   * */
  addMethods  (targetObj, typesObj, options) {
    Object.keys(typesObj).forEach(v => {
      targetObj[typesObj[v]] = function (config) {
        config.type = typesObj[v]
        // TODO (S.Panfilov)fix 'vueApp' in param
        return innerMethods.showMessage(config, options)
      }
    })
  },

  /**
   * @param  {Object} vueApp
   * @param  {String} name
   * @param  {Object} options
   * @param  {Object} pluginOptions
   */
  setMethod  (vueApp, name, options, pluginOptions) {
    if (!options.methods) options.methods = {}

    if (options.methods[name]) {
      // TODO (S.Panfilov) not sure - throw error here or just warn
      // if (options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name)
      console.error(MESSAGES.methodNameConflict + name)
    } else {
      options.methods[name] = innerMethods.makeMethod(vueApp, name, options, pluginOptions)
    }
  },

  /**
   * @param  {Object} vueApp
   * @param  {String} configName
   * @param  {Object} options
   * @param  {Object} pluginOptions
   * @return {Function}
   */
  makeMethod  (vueApp, configName, options, pluginOptions) {
    return function (config) {
      const newConfig = {}
      Object.assign(newConfig, VueNotifications.config)
      Object.assign(newConfig, options[VueNotifications.propertyName][configName])
      Object.assign(newConfig, config)

      return innerMethods.showMessage(newConfig, pluginOptions, vueApp)
    }
  },
  /**
   * @param  {Object} vueApp
   * @param  {Object} notifications
   * @param  {Object} pluginOptions
   */
  initVueNotificationPlugin  (vueApp, notifications, pluginOptions) {
    if (!notifications) return
    Object.keys(notifications).forEach(name => {
      innerMethods.setMethod(vueApp, name, vueApp.$options, pluginOptions)
    })

    vueApp.$emit(`${PACKAGE_NAME}-initiated`)
  }
}

const VueNotifications = {
  type: TYPE,
  propertyName: PROPERTY_NAME,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} Vue
   * @param  {Object} pluginOptions
   * @this VueNotifications
   */
  install (Vue, pluginOptions = {}) {
    const mixin = {}
    let hook

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)
    if (innerMethods.getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init'
    if (innerMethods.getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate'

    mixin[hook] = function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]

      innerMethods.initVueNotificationPlugin(vueApp, notificationsField, pluginOptions)
    }

    Vue.mixin(mixin)
    innerMethods.addMethods(this, this.type, pluginOptions)

    this.installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
VueNotifications._private = innerMethods

export default VueNotifications

/*END.TESTS_ONLY*/
