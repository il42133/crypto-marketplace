<template>
  <v-container fluid class="py-4">
    <!-- Header wrapper -->
    <div class="dashboard-header mb-4" style="position: relative;">
      <!-- Absolutely centered title -->
      <h1
        class="text-h5 my-0"
        style="position: absolute; left: 50%; transform: translateX(-50%);"
      >
        Crypto Marketplace Dashboard
      </h1>

      <!-- Button group flows normally at the right edge -->
      <div class="d-flex justify-end">
        <template v-if="!authStore.user">
          <v-btn text to="/login">Login</v-btn>
          <v-btn text to="/register">Register</v-btn>
        </template>
        <template v-else>
          <v-btn text @click="logout">Logout</v-btn>
        </template>
      </div>
    </div>

    <CryptoTable />
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { auth, signOut } from '../firebase.js'
import CryptoTable from '../components/CryptoTable.vue'

const authStore = useAuthStore()
const router    = useRouter()

async function logout() {
  await signOut(auth)
  router.push('/')
}
</script>
