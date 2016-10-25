import Vue from 'vue'
import App from './App.vue'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

miniToastr.init()

function toast ({title, message, type, timeout, cb, debugMsg}) {
  if (debugMsg) console[type](debugMsg)
  return miniToastr[type](message, title, timeout, cb)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)
// Vue.use(VueNotifications)

new Vue({
  el: '#app',
  render: h => h(App),
  created: function () {
    // `this` points to the vm instance
    VueNotifications.error({message: 'asdsad'})
    console.log(VueNotifications)
  }
})
