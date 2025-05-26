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
import PromotionCenter from '../views/PromotionCenter.vue'
import EmailAuthentication from '../views/EmailAuthentication.vue'
import Convert from '../views/convert.vue'
import Financing from '../views/Financing.vue'
import FinancingDetails from '../views/FinancingDetails.vue'
import OrdinaryProducts from '../views/OrdinaryProducts.vue'
import MyInvestments from '../views/MyInvestments.vue'
import Loans from '../views/Loans.vue'
import Deposit from '../views/Deposit.vue'
import DepositDetail from '../views/DepositDetail.vue'
import DepositHistory from '../views/DepositHistory.vue'
import Withdrawal from '../views/Withdrawal.vue'
import WithdrawalHistory from '../views/WithdrawalHistory.vue'
import WithdrawalDetail from '../views/WithdrawalDetail.vue'
import Assets from '../views/Assets.vue'
import Pledge from '../views/Pledge.vue'
import PledgeRecords from '../views/PledgeRecords.vue'

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
    path: '/email-authentication',
    name: 'EmailAuthentication',
    component: EmailAuthentication,
    meta: { requiresAuth: true }
  },

  {
    path: '/convert',
    name: 'Convert',
    component: Convert,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/financing',
    name: 'Financing',
    component: Financing,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/financing/details/:id',
    name: 'FinancingDetails',
    component: FinancingDetails,
    meta: { requiresAuth: true, requiresAdmin: false },
    props: true
  },

  {
    path: '/products',
    name: 'OrdinaryProducts',
    component: OrdinaryProducts,
    meta: { requiresAuth: true, requiresAdmin: false},
    props: true
  },

  {
    path: '/investments',
    name: 'MyInvestments',
    component: MyInvestments,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/loans',
    name: 'Loans',
    component: Loans,
    meta: {requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/deposit',
    name: 'Deposit',
    component: Deposit,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/deposit/:asset',
    name: 'DepositDetail',
    component: DepositDetail,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/deposit/history',
    name: 'DepositHistory',
    component: DepositHistory,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/withdrawal',
    name: 'Withdrawal',
    component: Withdrawal,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/withdrawal/:asset',
    name: 'WithdrawalDetail',
    component: WithdrawalDetail,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/withdrawal/history',
    name: 'WithdrawalHistory',
    component: WithdrawalHistory,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/coin/:id',
    name: 'coinDetail',
    component: CoinDetail,
    props: true
  },

  {
    path: '/assets',
    name: 'Assets',
    component: Assets,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/pledge',
    name: 'Pledge',
    component: Pledge,
    meta: { requiresAuth: true, requiresAdmin: false }
  },

  {
    path: '/pledge/records',
    name: 'PledgeRecords',
    component: PledgeRecords,
    meta: { requiresAuth: true, requiresAdmin: false }
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
