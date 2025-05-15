import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

import Login       from '../views/Login.vue'
import Register    from '../views/Register.vue'
import Dashboard   from '../views/Dashboard.vue'
import AdminPanel  from '../views/AdminPanel.vue'
import CoinDetail from '../views/CoinDetail.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Dashboard },
  { path: '/admin', component: AdminPanel, meta: { requiresAuth: true, requiresAdmin: true }, },
  { path: '/coin/:id', name: 'coinDetail', component: CoinDetail, props: true},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  // wait for Firebase to finish initializing
  if (!authStore.ready) {
    await new Promise((r) => {
      const unwatch = authStore.$subscribe(() => {
        if (authStore.ready) { unwatch(); r() }
      })
    })
  }
  const user = authStore.user

  // Protect admin pages
  if (to.meta.requiresAuth && !user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { path: '/' }
  }

  // Redirect logged-in users away from login/register
  if ((to.path === '/login' || to.path === '/register') && user) {
    return { path: '/' }
  }
})

export default router
