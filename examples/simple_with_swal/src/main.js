import Vue from 'vue'
import App from './App.vue'
import VueNotifications from 'vue-notifications'
import swal from 'sweetalert' // https://github.com/t4t5/sweetalert

Vue.config.productionTip = false

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return swal(title, message, type)
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueNotifications, options)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
