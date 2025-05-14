import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, onAuthStateChanged } from '../firebase.js'

export const useAuthStore = defineStore('auth', () => {
  const user     = ref(null)
  const isAdmin  = ref(false)
  const ready    = ref(false)

  onAuthStateChanged(auth, async (u) => {
    user.value = u
    if (u) {
      const token = await u.getIdTokenResult()
      isAdmin.value = !!token.claims.admin || u.email === 'admin@demo.com'
    } else {
      isAdmin.value = false
    }
    ready.value = true
  })

  return { user, isAdmin, ready }
})
