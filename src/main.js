import override from './override'

const PLUGIN_NAME = 'VueNotifications';
const PACKAGE_NAME = 'vue-notifications';
const PROPERTY_NAME = 'notifications';

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
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`
}

const EVENTS = {
  initiated: `${PACKAGE_NAME}-initiated`
}

/**
 * @param  {Object} Vue
 */
function getVersion (Vue) {
  const version = Vue.version.match(/(\d+)/g)
  return {
    major: version[0],
    regular: version[1],
    minor: version[2]
  }
}

/**
 * @param  {Object} Vue
 * @param  {Number} majorNum
 */
function isVueVersion (Vue, majorNum) {
  return this.getVersion(Vue).major == majorNum
}

/**
 * @param  {String} msg
 * @param  {String} type
 */
function showMessage (title, msg, type, timeOut) {
  if (type === TYPE.error) return console.error(msg)
  if (type === TYPE.warn) return console.warn(msg)
  if (type === TYPE.info) return console.log(msg)
  if (type === TYPE.success) return console.info(msg)
}

const VueNotifications = {
  type: TYPE,
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} Vue
   * @param  {Object} options
   */
  install (Vue, options = {}) {
    override(Vue, PROPERTY_NAME)

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)

    function init () {
      const notifications = this.$options[PROPERTY_NAME]
      if (!notifications) return

      Object.keys(notifications).forEach((v, i) => {
        this.$options.methods[v] = getMethod(v)
      })

      this.$emit(EVENTS.initiated)
    }

    function getMethod (configName) {
      return function (config) {
        config = config || this.$options[PROPERTY_NAME][configName]
        showMessage(config.title, config.message, config.type, config.timeOut)
      }
    }

    const mixin = {}

    if (STATE.isVueVersion(Vue, VUE_VERSION.evangelion)) {
      mixin.init = function () {
        init.call(this)
      }
    }

    //v2
    if (STATE.isVueVersion(Vue, VUE_VERSION.ghostInTheShell)) {
      mixin.beforeCreate = function () {
        init.call(this)
      }
    }

    Vue.mixin(mixin)

    this.installed = true
  }
}

if (typeof window !== 'undefined' && window.Vue
) {
  window.Vue.use(VueNotifications)
}

export default VueNotifications