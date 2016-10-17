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
 * @param  {String} type
 * @param  {String} message
 * @param  {String} title
 * @param  {String} debugMsg
 */
function showDefaultMessage ({ type, message, title, debugMsg }) {
  let msg = `Title: ${title}, Message: ${message}, DebugMsg: ${debugMsg}`

  if (type === TYPE.error) return console.error(msg)
  if (type === TYPE.warn) return console.warn(msg)
  if (type === TYPE.success) return console.info(msg)

  return console.log(msg)
}

/**
 * @param  {Object} config
 * @param  {Object} options
 */
function showMessage (config, options) {
  const method = options[config.type] || showDefaultMessage
  method(config)

  if (config.cb) return config.cb()
}

/**
 * @param {Object} type
 * @return {undefined}
 * */
function addProtoMethods (type) {
  Object.keys(type).forEach(v => {
    VueNotifications[type[v]] = function (config) {
      config.type = type[v]
      return showMessage(config, options)
    }
  })
}

const VueNotifications = {
  type: TYPE,
  config: {
    type: TYPE.info,
    timeout: 3000
  },
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
        const newConfig = {}
        Object.assign(newConfig, VueNotifications.config)
        Object.assign(newConfig, this.$options[PROPERTY_NAME][configName])
        Object.assign(newConfig, config)

        return showMessage(newConfig, options)
      }
    }

    const mixin = {}
    let hook

    if (getVersion(Vue).major === VUE_VERSION.evangelion) hook = 'init'
    if (getVersion(Vue).major === VUE_VERSION.ghostInTheShell) hook = 'beforeCreate'

    mixin[hook] = function () {
      _initVueNotificationPlugin.call(this, this.$options[PROPERTY_NAME])
    }

    Vue.mixin(mixin)
    addProtoMethods(TYPE)

    this.installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

export default VueNotifications