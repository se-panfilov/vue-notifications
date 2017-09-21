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
//toastr
import 'jquery' // required by 'toastr'
import toastr from 'toastr' //https://github.com/CodeSeven/toastr
import 'toastr/build/toastr.min.css'
//end toastr
//iziToast
import iziToast from 'izitoast' //https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css'
//end iziToast
//noty
import Noty from 'noty' //https://github.com/needim/noty
import 'noty/lib/noty.css'
import swal from 'sweetalert' //https://github.com/t4t5/sweetalert
//end noty

Vue.config.productionTip = false

miniToastr.init()

const UI_LIBS = {
  miniToastr: 'miniToastr',
  VueToasted: 'VueToasted',
  VueEasyToast: 'VueEasyToast',
  toastr: 'toastr',
  iziToast: 'iziToast',
  Noty: 'Noty',
  swal: 'swal'
}

const currentLib = UI_LIBS.swal

const TOASTS = {
  [UI_LIBS.miniToastr] ({title, message, type, timeout, cb, debugMsg}) {
    if (debugMsg) console[type](debugMsg)
    return miniToastr[type](message, title, timeout, cb)
  },
  [UI_LIBS.VueToasted] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    if (type === VueNotifications.type.warn) type = 'show'
    return Vue.toasted[type]('hola billo', {duration: timeout})
  },
  [UI_LIBS.VueEasyToast] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    if (type === VueNotifications.type.warn) type = 'show'
    return Vue.toasted[type](message, {duration: timeout})
  },
  [UI_LIBS.toastr] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    // this shit requires jquery, lol
    if (type === VueNotifications.type.warn) type = 'warning'
    return toastr[type](message, title, {timeOut: timeout})
  },
  [UI_LIBS.iziToast] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    if (type === VueNotifications.type.warn) type = 'warning'
    return iziToast[type]({title, message, timeout})
  },
  [UI_LIBS.Noty] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    if (type === VueNotifications.type.warn) type = 'warning'

    return new Noty({text: message, timeout, type}).show()
  },
  [UI_LIBS.swal] ({title, message, type, timeout, cb, debugMsg, position}) {
    if (debugMsg) console[type](debugMsg)

    if (type === VueNotifications.type.warn) type = 'warning'
    return swal(title, message, type)
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
