import Vue from 'vue'
import Router from 'vue-router'
import mainWrap from '@/components/mainWrap'
import login from '@/components/login'
import register from '@/components/register'
import forget from '@/components/forget'
import dashboard from '@/components/dashboard'
import detect from '@/components/detect'
import packages from '@/components/packages'
import purchases from '@/components/purchases'
import api from '@/components/api'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainWrap',
      component: mainWrap
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/',
      component: mainWrap,
      children: [
        { path: '/dashboard', component: dashboard, name: 'dashboard' },
        { path: '/detect', component: detect, name: 'detect' },
        { path: '/purchases', component: purchases, name: 'purchases' },
        { path: '/packages', component: packages, name: 'packages' },
        { path: '/api', component: api, name: 'api' },
      ]
    }
  ]
})
