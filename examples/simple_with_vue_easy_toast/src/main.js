import Vue from 'vue'
import App from './App.vue'
import VueNotifications from 'vue-notifications'
import VueEasyToast from 'vue-easy-toast' // https://github.com/noru/vue-easy-toast

Vue.config.productionTip = false

function toast ({title, message, type, timeout, cb}) {
  let className = 'et-info'
  if (type === VueNotifications.types.warn) className = 'et-warn'
  else if (type === VueNotifications.types.error) className = 'et-alert'

  return Vue.toast(message, {duration: timeout, className})
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}

Vue.use(VueEasyToast)
Vue.use(VueNotifications, options)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
