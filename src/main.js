import override from './override'

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

/**
 * @param  {Object} Vue
 * @return {Object}
 */
function getVersion (Vue) {
  const version = Vue.version.match(/(\d+)/g)
  return {
    major: +version[0],
    regular: +version[1],
    minor: +version[2]
  }
}

/**
 * @param  {Object} config
 */
function showDefaultMessage (config) {
  let msg = `Message: ${config.message}`
  msg = (config.title) ? `Title: ${config.title}, ` + msg : msg
  msg = (config.debugMsg) ? `DebugMsg: ${config.debugMsg}, ` + msg : msg

  if (config.type === TYPE.error) return console.error(msg)
  if (config.type === TYPE.warn) return console.warn(msg)
  if (config.type === TYPE.success) return console.info(msg)

  return console.log(msg)
}

/**
 * @param  {Object} config
 * @param  {Object} options
 */
function showMessage (config, options) {
  const method = options[config.type] || showDefaultMessage
  method(config)

  if (config.cb) config.cb()
}

const VueNotifications = {
  type: TYPE,
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} Vue
   * @param  {Object} options
   * @this VueNotifications
   */
  install (Vue, options = {}) {
    override(Vue, PROPERTY_NAME)

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)

    /**
     * @param  {Object} notifications
     */
    function _initVueNotificationPlugin (notifications) {
      if (!notifications) return

      Object.keys(notifications).forEach(setMethod.bind(this))

      this.$emit(`${PACKAGE_NAME}-initiated`)
    }

    /**
     * @param  {String} name
     */
    function setMethod (name) {
      if (this.$options.methods[name]) throw console.error(MESSAGES.methodNameConflict + name)
      this.$options.methods[name] = makeMethod(name)
    }

    /**
     * @param  {String} configName
     * @return {Function}
     */
    function makeMethod (configName) {
      return function (config) {
        // TODO (S.Panfilov) add merge method
        config = config || this.$options[PROPERTY_NAME][configName]
        showMessage(config, options)
      }
    }

    function addProtoMethods () {
      Object.keys(TYPE).forEach(v => {
        VueNotifications[TYPE[v]] = function (config) {
          config.type = TYPE[v]
          showMessage(config, options)
        }
      })
    }

    const mixin = {}
    let hook

    if (getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init'
    if (getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate'

    mixin[hook] = function () {
      _initVueNotificationPlugin.call(this, this.$options[PROPERTY_NAME])
    }

    Vue.mixin(mixin)
    addProtoMethods()

    this.installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

export default VueNotifications