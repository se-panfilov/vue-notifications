import override from './override'

const STYLE = {
  error: '-error',
  warn: '-warn',
  info: '-info',
  success: '-success'
}

const STATE = {
  installed: false
}
const MESSAGES = {
  alreadyInstalled: 'VueNotifications: plugin already installed'
}

function showMessage (msg, style) {
  if (style === STYLE.error) return console.error(msg)
  if (style === STYLE.warn) return console.warn(msg)
  if (style === STYLE.info) return console.log(msg)
  if (style === STYLE.success) return console.info(msg)
}

const install = (Vue, options) => {
  override(Vue, 'notifications')

  if (STATE.installed) throw console.error(MESSAGES.alreadyInstalled)

  Vue.successMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  Vue.prototype.$infoMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  Vue.prototype.$errorMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  Vue.prototype.$warnMsg = (msg) => {
    showMessage(msg, STYLE.success)
  }

  STATE.installed = true

  var p = Vue.prototype;
  p.__callHook = p._callHook;
  p._callHook = function (hook) {
    if (hook == 'created') {
      var self = this;

      const notifications = this.$options['notifications']
      for (var k in notifications) {
        if (notifications.hasOwnProperty(k)) {
          console.info(notifications[k])
          // TODO (S.Panfilov)add methods here - show(), blink(), block(), etc
        }
      }

      // On every object use the $sync function to get the value
      // _.each(this.$options['notifications'], function (rxFunc, key) {
      //   console.info(rxFunc)
      //   console.log(key)
      // });
    }
    this.__callHook(hook);
  }

  // setInterval(() => {
  //   console.info(Vue['notifications'])
  // }, 3000)
}

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(VueNotifications)
// }

export default install