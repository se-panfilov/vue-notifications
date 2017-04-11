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
  eva: 1,
  ghost: 2
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
  getMajorVersion (Vue) {
    const version = Vue.version.match(/(\d+)/g)
    return +version[0]
  },

  /**
   * @param  {String} msg
   * @param  {String} type
   * @param  {Object} types
   */
  showInConsole (msg, type, types) {
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
   * @return  {String}
   */
  showDefaultMessage ({type, message, title, debugMsg}) {
    let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}, type: ${type}`

    innerMethods.showInConsole(msg, type, TYPE)

    return msg
  },
  /**
   * @param  {Object} elem
   * @param  {String} className
   */
  addClass (elem, className) {
    if (elem.classList) {
      elem.classList.add(className)
    } else {
      elem.className += ' ' + className
    }
  },
  /**
   * @param  {Object} elem
   * @param  {String} className
   */
  removeClass (elem, className) {
    if (elem.classList) {
      elem.classList.remove(className)
    } else {
      elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  },
  /**
   * @param  {Object} elem
   * @param  {String} className
   * @return {Boolean}
   */
  hasClass (elem, className) {
    if (elem.classList) {
      return elem.classList.contains(className)
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(elem.className)
    }
  },
  /**
   * @param  {Object} vueApp
   * @param  {Object} config
   * @return {Object}
   */
  getValues (vueApp, config) {
    const result = {}
    const keepFnFields = ['cb']

    Object.keys(config).forEach(field => {
      keepFnFields.forEach(fnField => {
        if (field === fnField) {
          result[field] = config[field].bind(vueApp)
        } else {
          result[field] = (typeof config[field] === 'function') ? config[field].call(vueApp) : config[field]
        }
      })
    })

    return result
  },

  /**
   * @param  {Object} config
   * @param  {Object} options
   * @param  {Object} vueApp
   */
  showMessage (config, options, vueApp) {
    const valuesObj = innerMethods.getValues(vueApp, config)
    const isMethodOverridden = options && options[valuesObj.type]
    const method = isMethodOverridden ? options[valuesObj.type] : innerMethods.showDefaultMessage
    method(valuesObj, vueApp)

    if (config.cb) return config.cb()
  },

  /**
   * @param {Object} targetObj
   * @param {Object} typesObj
   * @param {Object} options
   * @return {undefined}
   * */
  addMethods (targetObj, typesObj, options) {
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
  setMethod (vueApp, name, options, pluginOptions) {
    if (!options.methods) options.methods = {}

    if (options.methods[name]) {
      // TODO (S.Panfilov) not sure - throw error here or just warn
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
  makeMethod (vueApp, configName, options, pluginOptions) {
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
  initVueNotificationPlugin (vueApp, notifications, pluginOptions) {
    if (!notifications) return
    Object.keys(notifications).forEach(name => {
      innerMethods.setMethod(vueApp, name, vueApp.$options, pluginOptions)
    })

    vueApp.$emit(`${PACKAGE_NAME}-initiated`)
  },
  /**
   * @param  {Object} vueApp
   * @param  {Object} notifications
   */
  unlinkVueNotificationPlugin (vueApp, notifications) {
    if (!notifications) return
    const attachedMethods = vueApp.$options.methods
    Object.keys(notifications).forEach(name => {
      if (attachedMethods[name]) {
        attachedMethods[name] = undefined
        delete attachedMethods[name]
      }
    })

    vueApp.$emit(`${PACKAGE_NAME}-unlinked`)
  }
}

/**
 * @param {Function} Vue
 * @param {Object} pluginOptions
 * @return {Object}
 */
function makeMixin (Vue, pluginOptions) {
  let hooks = {
    init: '',
    destroy: 'beforeDestroy',
    mounted: ''
  }

  if (innerMethods.getMajorVersion(Vue) === VUE_VERSION.eva) {
    hooks.init = 'init'
    hooks.mounted = 'compiled'
  }
  if (innerMethods.getMajorVersion(Vue) === VUE_VERSION.ghost) {
    hooks.init = 'beforeCreate'
    hooks.mounted = 'mounted'
  }

  return {
    [hooks.init]: function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]

      innerMethods.initVueNotificationPlugin(vueApp, notificationsField, pluginOptions)
    },
    [hooks.destroy]: function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]
      innerMethods.unlinkVueNotificationPlugin(vueApp, notificationsField)
    }
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
    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)
    const mixin = makeMixin(Vue, pluginOptions)
    Vue.mixin(mixin)

    innerMethods.addMethods(this, this.type, pluginOptions)

    this.installed = true
  }

  //TODO (S.Panfilov) add ability to access this.notifications.someError.message
  //TODO (S.Panfilov) add "noCall:true" property
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

