import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/threeLight',
    name: 'ThreeLight',
    component: () => import('../views/ThreeLight.vue')
  },
  {
    path: '/spotLight',
    name: 'SpotLight',
    component: () => import('../views/SpotLight.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
