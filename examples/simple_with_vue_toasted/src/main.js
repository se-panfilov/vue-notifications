import Vue from 'vue'
import App from './App.vue'
import VueNotifications from 'vue-notifications'
import VueToasted from 'vue-toasted' // https://github.com/shakee93/vue-toasted

Vue.config.productionTip = false

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'show'
  return Vue.toasted[type](message, {duration: timeout})
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueToasted)
Vue.use(VueNotifications, options)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
