import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    name: 'index',
    path: '/',
    component: () => import('@/pages/index.vue')
  },
  {
    name: 'about',
    path: '/',
    component: () => import('@/pages/about.vue')
  },
  {
    name: 'usercenter',
    path: '/usercenter',
    children: [{
      name: 'usercenter-id',
      path: ':id?',
      component: () => import('@/pages/usercenter/_id.vue')
    }]
  },
  {
    name: 'category',
    path: '/category',
    children: [{
      name: 'category-id',
      path: ':id?',
      children: [{
        name: 'usercenter-id-subCategory',
        path: ':subCategory?',
        component: () => import('@/pages/_id/_subCategory.vue')
      }]
    }]
  }
]

const langRoutes = [{
    path: '/en',
    children: routes
  },
  {
    path: '/cn',
    children: routes
  },
  {
    path: '/tw',
    children: routes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  langRoutes
})

export default router