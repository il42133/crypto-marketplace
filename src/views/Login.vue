<template>
  <v-container fluid class="fill-height">
    <v-row class="d-flex align-center justify-center">
      <!-- Narrower column: full-width xs, 8/12 sm, 6/12 md, 4/12 lg -->
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6">
          <v-card-title class="text-h6 pb-2">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                class="mb-4"
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                class="mb-6"
              />
              <v-btn
                small
                color="primary"
                class="mb-4 mx-auto d-block"
                :style="{ width: '140px' }"
                :loading="loading"
                type="submit"
              >
                Sign In
              </v-btn>
            </v-form>
            <div class="d-flex justify-center mb-4">
              <RouterLink to="/register">Need an account? Register</RouterLink>
            </div>
            <v-alert v-if="error" type="error" dense outlined>
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { auth, signInWithEmailAndPassword } from '../firebase.js'

const router = useRouter()
const route  = useRoute()

const email    = ref('')
const password = ref('')
const error    = ref(null)
const loading  = ref(false)

async function onSubmit() {
  loading.value = true
  error.value   = null
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
