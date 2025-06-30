import type {RouteRecordRaw} from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about',
    component: () => import('@/views/about/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;