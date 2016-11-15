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
  getVersion (Vue) {
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
  showDefaultMessage ({ type, message, title, debugMsg }) {
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
   * @param  {Object} elem
   * @param  {String} message
   * @param  {String} inClass
   * @param  {String} outClass
   */
  showInlineFn (elem, message, { inClass, outClass }) {
    elem.innerText = message
    if (inClass) {
      if (!innerMethods.hasClass(elem, inClass)) innerMethods.addClass(elem, inClass)
    }

    if (outClass) {
      if (innerMethods.hasClass(elem, outClass)) innerMethods.removeClass(elem, outClass)
    }
  },
  /**
   * @param  {Object} elem
   * @param  {String} inClass
   * @param  {String} outClass
   */
  clearInlineFn (elem, { inClass, outClass }) {
    if (inClass) {
      if (innerMethods.hasClass(elem, inClass)) innerMethods.removeClass(elem, inClass)
    }

    if (outClass) {
      if (!innerMethods.hasClass(elem, outClass)) innerMethods.addClass(elem, outClass)
    }

    elem.innerText = ''
  },
  /**
   * @param  {String} id
   * @param  {String} type
   * @param  {String} timeout
   * @param  {String} message
   * @param  {Object} classes
   * @param  {Function} watch
   * @param  {String} debugMsg
   * @param  {Function} cb
   * @param  {Object} vueApp
   * @return  {String}
   */
  showInlineMessage ({ id, type, timeout, message, classes = {}, watch, debugMsg, cb }, vueApp) {
    // TODO (S.Panfilov) handle class add and remove here
    if (debugMsg) innerMethods.showInConsole(debugMsg, type, TYPE)
    const elem = document.getElementById(id)

    if (watch) {
      timeout = false
      if (watch && watch()) innerMethods.showInlineFn(elem, message, classes)
      // const interval = setInterval(() => {
      let prev
      let cur
      setInterval(() => {
        if (watch) {
          cur = watch()
          // clearInterval(interval)
          if (cur !== prev) {
            if (cur) innerMethods.showInlineFn.call(innerMethods, elem, message, classes)
            if (!cur) innerMethods.clearInlineFn.call(innerMethods, elem, classes)
            prev = cur
          }
        }
      }, 50)
    }

    if (!watch) {
      innerMethods.showInlineFn(elem, message, classes)
      setTimeout(() => {
        innerMethods.clearInlineFn.call(vueApp, elem, classes)
      }, timeout)
    }

    // TODO (S.Panfilov) BUG: Weird behaviour: cb calls 2 times
    if (cb) {
      // TODO (S.Panfilov) bug here
      cb.call(vueApp, elem, () => innerMethods.clearInlineFn.call(innerMethods, elem, classes))
    }

    return message
  },

  /**
   * @param  {Object} vueApp
   * @param  {Object} config
   * @return {Object}
   */
  getValues (vueApp, config) {
    const result = {}
    const keepFnFields = ['cb', 'watch']

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
  launchWatchableNotifications (vueApp, notifications) {
    if (!notifications) return
    Object.keys(notifications).forEach(name => {
      if (vueApp[name] && notifications[name].watch) {
        vueApp[name]()
      }
    })

    vueApp.$emit(`${PACKAGE_NAME}-launched_watchable`)
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

  if (innerMethods.getVersion(Vue).major === VUE_VERSION.evangelion) {
    hooks.init = 'init'
    hooks.mounted = 'compiled'
  }
  if (innerMethods.getVersion(Vue).major === VUE_VERSION.ghostInTheShell) {
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
    [hooks.mounted]: function () {
      const vueApp = this
      const vueAppOptions = this.$options
      const notificationsField = vueAppOptions[VueNotifications.propertyName]

      innerMethods.launchWatchableNotifications(vueApp, notificationsField)
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
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

/*START.TESTS_ONLY*/
VueNotifications._private = innerMethods
VueNotifications._private.TYPE = TYPE
VueNotifications._private.PLUGIN_NAME = PLUGIN_NAME
VueNotifications._private.PACKAGE_NAME = PACKAGE_NAME
VueNotifications._private.PROPERTY_NAME = PROPERTY_NAME
VueNotifications._private.VUE_VERSION = VUE_VERSION
VueNotifications._private.MESSAGES = MESSAGES

export default VueNotifications

/*END.TESTS_ONLY*/
