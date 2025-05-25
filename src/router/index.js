// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore }           from '../stores/auth.js'

import Login            from '../views/Login.vue'
import Register         from '../views/Register.vue'
import LandingPage      from '../views/LandingPage.vue'    // ← new
import Dashboard        from '../views/Dashboard.vue'      // your CryptoTable
import AdminOverrides   from '../views/AdminOverrides.vue'
import AdminLogs        from '../views/AdminLogs.vue'
import CoinDetail       from '../views/CoinDetail.vue'
import PrimaryVerification from '../views/PrimaryVerification.vue'
import SetFundPassword from '../views/SetFundPassword.vue'
import SetLoginPassword from '../views/SetLoginPassword.vue'
import { tr } from 'vuetify/locale'
import PromotionCenter from '../views/PromotionCenter.vue'

const routes = [
  { path: '/login',    component: Login },
  { path: '/register', component: Register },

  // Landing is now your home page
  { path: '/', name: 'Landing', component: LandingPage },

  // Markets lives under /markets
  { path: '/markets', name: 'Dashboard', component: Dashboard },

  // Admin
  {
    path: '/admin',
    name: 'AdminOverrides',
    component: AdminOverrides,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/admin/logs',
    name: 'AdminLogs',
    component: AdminLogs,
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: '/primary-verification',
    name: 'PrimaryVerification',
    component: PrimaryVerification,
    meta: { requiresAuth: true, requiresAdmin: false },
  },

  {
    path: '/set-fund-password',
    name: 'SetFundPassword',
    component: SetFundPassword,
    meta: { requiresAuth: true, requiresAdmin: false },
  },

  {
    path: '/set-login-password',
    name: 'SetLoginPassword',
    component: SetLoginPassword,
    meta: { requiresAuth: true, requiresAdmin: false },
  },

  {
    path: '/promotion',
    name: 'PromotionCenter',
    component: PromotionCenter,
    meta: { requiresAuth: true, requiresAdmin: false },
  },

  {
    path: '/coin/:id',
    name: 'coinDetail',
    component: CoinDetail,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // wait for Firebase init
  if (!authStore.ready) {
    await new Promise(r => {
      const unwatch = authStore.$subscribe(() => {
        if (authStore.ready) { unwatch(); r() }
      })
    })
  }

  const user = authStore.user

  // protect admin pages
  if (to.meta.requiresAuth && !user) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { path: '/' }   // goes back to Landing
  }

  // redirect signed-in users away from login/register
  if ((to.path === '/login' || to.path === '/register') && user) {
    return { path: '/' }
  }
})

export default router
