import Vue from 'vue'
import Router from 'vue-router'
import Showcase from '@/components/showcase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'showcase',
      component: Showcase
    }
  ]
})
