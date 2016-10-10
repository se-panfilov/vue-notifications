import override from './override'

const PLUGIN_NAME = 'VueNotifications';
const PACKAGE_NAME = 'vue-notifications';
const PROPERTY_NAME = 'notifications';

const STYLE = {
  error: '-error',
  warn: '-warn',
  info: '-info',
  success: '-success'
}

const STATE = {
  /**
   * @param  {Object} Vue
   */
  getVersion (Vue) {
    const version = Vue.version.match(/(\d+)/g)
    return {
      major: version[0],
      regular: version[1],
      minor: version[2]
    }
  },
  /**
   * @param  {Object} Vue
   * @param  {Number} majorNum
   */
  isVueVersion (Vue, majorNum) {
    return this.getVersion(Vue).major == majorNum
  }
}

const VUE_VERSION = {
  evangelion: 1,
  ghostInTheShell: 2
}

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`
}

const EVENTS = {
  initiated: `${PACKAGE_NAME}-initiated`,
  installed: `${PACKAGE_NAME}-installed`
}

class Notification {
  /**
   * @param  {Object} obj
   */
  constructor (obj) {
    this.type = obj.type
    this.isVisible = obj.isVisible
    this.timeOut = obj.timeOut
  }

  show () {
    console.log(1111)
  }
}

/**
 * @param  {String} msg
 * @param  {String} style
 */
function showMessage (msg, style) {
  if (style === STYLE.error) return console.error(msg)
  if (style === STYLE.warn) return console.warn(msg)
  if (style === STYLE.info) return console.log(msg)
  if (style === STYLE.success) return console.info(msg)
}

/**
 * @param  {String} hook
 */
function patchNotifications (hook) {
  if (hook == 'created') {

    // getAllNotifications(this).map((v, k)=> {
    // getAllNotifications(this).forEach((v, i, arr)=> {
    console.info(this)
    const notifications = getAllNotifications(this)

    for (var k in notifications) {
      if (notifications.hasOwnProperty(k)) {
        console.log(this)
        console.info(this.methods)
      }
    }
    // => {
    //   console.info(v)
    //   console.info(i)
    //   console.info(arr)
    //   // Object.setPrototypeOf(v, Notification)
    //   // v.prototype = Notification
    //   // console.info(v.show)
    //   // return new Notification(v)
    // })
  }
  this.__callHook(hook);
}

/**
 * @param  {Object} instance
 */
function getAllNotifications (instance) {
  if (!instance) return {}
  var obj = instance.$options[PROPERTY_NAME]
  if (!obj) return {}
  return obj
  // return Object.values(obj)
}

const VueNotifications = {
  installed: false,
  /**
   * Plugin | vue-notifications
   * @param  {Function} Vue
   * @param  {Object} options
   */
  install (Vue, options = {}) {
    override(Vue, PROPERTY_NAME)

    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)

    // Vue.successMsg = msg => showMessage(msg, STYLE.success)
    // Vue.prototype.$infoMsg = msg => showMessage(msg, STYLE.success)
    // Vue.prototype.$errorMsg = msg => showMessage(msg, STYLE.success)
    // Vue.prototype.$warnMsg = msg => showMessage(msg, STYLE.success)

    // patchNotifications(Vue.prototype)
    // var p = Vue.prototype;
    // p.__callHook = p._callHook;
    // p._callHook = function (hook) {
    //   if (hook == 'created') {
    //     var self = this;
    //
    //     // const notifications = this.$options[PROPERTY_NAME]
    //     const notifications = this.$options['notifications']
    //     console.info(notifications)
    //     Object.values(notifications).map((v,k) => {
    //       console.info(123)
    //     })
    //   }
    //   this.__callHook(hook);
    // }

    // var p = Vue.prototype;
    // p.__callHook = p._callHook;
    // p._callHook = patchNotifications

    function init () {
      let notifications = this.$options[PROPERTY_NAME]
      if (!notifications) return

      Object.keys(notifications).map(key => {
        // console.info(key)
        let prop = notifications[key]
        if (!prop) return
        // let obj = (typeof prop === 'function') ? notifications[key].bind(this)() : notifications[key]
        // if (key === 'title') {
        //   util[key](obj)
        //   return
        // }
        // util.handle(obj, key, 'head', update)
      })

      this.$emit(EVENTS.initiated)
    }

    function getMethods () {
      const notifications = this.$options[PROPERTY_NAME]
      const result = {}
      if (!notifications) return

      Object.keys(notifications).forEach(key => {
        let prop = notifications[key]
        /**
         * @param  {Object} config
         */
        result[key] = function (config) {
          config = config || notifications[prop]
        }
        // result[prop] = Notification
      })

      return result
    }

    const mixin = {
      destroyed () {
        // destroy(this.$options.head)
      },
      events: {
        // updateHead () {
        //   init.bind(this)(true)
        //   util.update()
        // }
      },
      methods: {}
    }


    // v1
    if (STATE.isVueVersion(Vue, VUE_VERSION.evangelion)) {
      console.info('eva')
      mixin.ready = function () {
        mixin.methods = getMethods.bind(this)()
        console.log('Methods')
        console.info(mixin.methods)
        init.bind(this)()
      }
    }

    //v2
    if (STATE.isVueVersion(Vue, VUE_VERSION.ghostInTheShell)) {
      console.info('ghost')
      mixin.mounted = function () {
        init.bind(this)()
      }
    }

    console.log('Mixin:')
    console.info(mixin)
    Vue.mixin(mixin)

    this.installed = true
    // this.$emit(EVENTS.installed)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueNotifications)
}

export default VueNotifications