import { createRouter, createWebHistory } from 'vue-router'
//import Home from '../views/Home.vue'
import names from '../views/setnames.vue'
import roles from '../views/rolechoose.vue'
import night from '../views/night.vue'
import day from '../views/day.vue'
import statuspage from '../views/statuspage.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/names',
    name: 'names',
    component: names
  },
  {
    path: '/roles',
    name: 'roles',
    component: roles
  },
  {
    path: '/night',
    name: 'night',
    component: night
  },
  {
    path: '/day',
    name: 'day',
    component: day
  },
  {
    path: '/statuspage',
    name: 'statuspage',
    component: statuspage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
