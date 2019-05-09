// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueNotifications from 'vue-notifications'
import Noty from 'noty' // https://github.com/needim/noty
import 'noty/lib/noty.css'

Vue.config.productionTip = false

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return new Noty({text: message, timeout, type}).show()
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
