// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNotifications from 'vue-notifications'
//Third-party UI libs
import VueEasyToast from 'vue-easy-toast' //https://github.com/noru/vue-easy-toast
import miniToastr from 'mini-toastr' //https://github.com/se-panfilov/mini-toastr
import VueToasted from 'vue-toasted' //https://github.com/shakee93/vue-toasted
import VueNotification from 'vue-notification' //https://github.com/euvl/vue-notification

Vue.config.productionTip = false

miniToastr.init()

const UI_LIBS = {
  miniToastr: 'miniToastr',
  VueToasted: 'VueToasted',
  VueEasyToast: 'VueEasyToast',
  VueNotification: 'VueNotification'
}

const currentLib = UI_LIBS.VueNotification

const TOASTS = {
  [UI_LIBS.miniToastr] ({title, message, type, timeout, cb, debugMsg}) {
    if (debugMsg) console[type](debugMsg)
    return miniToastr[type](message, title, timeout, cb)
  },
  [UI_LIBS.VueToasted] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    let method = 'show'
    if (type === VueNotifications.type.error) method = 'error'
    if (type === VueNotifications.type.success) method = 'success'
    if (type === VueNotifications.type.info) method = 'info'

    return Vue.toasted[method]('hola billo', {duration: timeout})
  },
  [UI_LIBS.VueEasyToast] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    let method = 'show'
    if (type === VueNotifications.type.error) method = 'error'
    if (type === VueNotifications.type.success) method = 'success'
    if (type === VueNotifications.type.info) method = 'info'

    return Vue.toasted[method]('hola billo', {duration: timeout})
  },
  [UI_LIBS.VueNotification] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    let toastType = ''
    if (type === VueNotifications.type.warn) toastType = 'warning'

    return this.$notify({
      title,
      text: message,
      type: toastType,
      duration: timeout,
      position
    })
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
Vue.use(VueNotification)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
