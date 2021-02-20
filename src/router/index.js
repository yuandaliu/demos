import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/threeLight',
    name: 'ThreeLight',
    component: () => import('../views/ThreeLight.vue')
  },
  {
    path: '/',
    redirect: '/threeLight'
  },
  {
    path: '/practice',
    name: 'Practice',
    component: () => import('../views/Practice.vue')
  },
  {
    path: '/ball',
    name: 'Ball',
    component: () => import('../views/Ball.vue')
  },
  {
    path: '/createModel',
    name: 'CreateModel',
    component: () => import('../views/CreateModel.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
