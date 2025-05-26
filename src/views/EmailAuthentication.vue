<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Email Authentication</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-headset</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Form, centered & constrained -->
    <v-container
      class="pa-4 d-flex flex-column align-center"
      style="max-width: 360px; margin: 0 auto;"
    >
      <!-- Email field title -->
      <div class="text-h6 font-weight-bold mb-4">Email Address</div>
      <v-text-field
        v-model="email"
        label="Enter your email"
        outlined
        density="compact"
        style="width: 100%;"
      />

      <!-- Send Code button -->
      <v-btn
        size="small"
        color="primary"
        class="mb-6"
        style="width: 100%;"
        @click="sendCode"
      >
        Send Verification Code
      </v-btn>

      <!-- Verification code field title -->
      <div class="text-h6 font-weight-bold mb-4">Verification Code</div>
      <v-text-field
        v-model="code"
        label="Enter Verification Code"
        outlined
        density="compact"
        style="width: 100%;"
      />

      <!-- Submit button -->
      <v-btn
        size="small"
        color="primary"
        class="mb-6"
        style="width: 100%;"
      >
        Submit
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router    = useRouter()
const goBack    = () => router.back()

const email = ref('')
const code  = ref('')

function sendCode() {
  // placeholder: trigger sending verification code
  console.log('Send verification code to', email.value)
}
</script>

<style scoped>
.fill-height {
  flex: 1;
}
</style>
