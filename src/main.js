import Vue from 'vue'
import App from './App.vue'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'

console.info(123)

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


new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(VueNotifications, options)
