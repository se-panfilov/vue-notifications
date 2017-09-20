// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNotifications from 'vue-notifications'
//Third-party UI libs
import VueEasyToast from 'vue-easy-toast'
import miniToastr from 'mini-toastr'
import VueToasted from 'vue-toasted'

Vue.config.productionTip = false

miniToastr.init()

const UI_LIBS = {
  miniToastr: 'miniToastr',
  VueToasted: 'VueToasted',
  VueEasyToast: 'VueEasyToast'
}

const currentLib = UI_LIBS.VueToasted

const TOASTS = {
  miniToastr ({title, message, type, timeout, cb, debugMsg}) {
    if (debugMsg) console[type](debugMsg)
    return miniToastr[type](message, title, timeout, cb)
  },
  VueEasyToast ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    let className = 'et-info'
    if (type === VueNotifications.type.error) className = 'et-error'
    if (type === VueNotifications.type.warn) className = 'et-warn'

    return Vue.toast(message, {duration: timeout, className: className, position})
  },
  VueToasted ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    let method = 'show'
    if (type === VueNotifications.type.error) method = 'error'
    if (type === VueNotifications.type.success) method = 'success'
    if (type === VueNotifications.type.info) method = 'info'

    return Vue.toasted[method]('hola billo', {duration: timeout})
  }
}

const options = {
  success: TOASTS[currentLib],
  error: TOASTS[currentLib],
  info: TOASTS[currentLib],
  warn: TOASTS[currentLib]
}

Vue.use(VueNotifications, options)
Vue.use(VueEasyToast)
Vue.use(VueToasted)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
