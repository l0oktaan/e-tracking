import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    //route level code-splitting
    //this generates a separate chunk (about.[hash].js) for this route
    //which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue')
  },
  {
    path: '/worklist',
    name: 'worklist',    
    component: () => import('../views/WorkList.vue')
  },
  {
    path: '/workform',
    name: 'workform',    
    component: () => import('../components/WorkForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
