import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layouts/main/index.vue'
import asyncRoutes from './asyncRoutes.js'
import authMiddleware from '@/middleware/auth'

let routes = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    props: true,
    meta: {
      title: 'home'
    },
    children: [...asyncRoutes]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/not-found',
    component: () => import('@/views/errors/404/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

authMiddleware(router)

export default router
