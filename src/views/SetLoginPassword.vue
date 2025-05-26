<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-toolbar-title>Set login password</v-toolbar-title>
      <v-spacer />
      <v-btn icon><v-icon>mdi-headset</v-icon></v-btn>
    </v-app-bar>

    <!-- Compact form -->
    <v-container
      class="pa-4 d-flex flex-column align-center"
      style="max-width:360px; margin:0 auto;"
    >
      <!-- Old password -->
      <div class="text-h6 font-weight-bold mb-4">Old Password</div>
      <v-text-field
        v-model="oldPassword"
        :type="showOld ? 'text' : 'password'"
        density="compact"
        placeholder="Enter old password"
        prepend-inner-icon="mdi-lock"
        :append-icon="showOld ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showOld = !showOld"
        class="mb-4"
        style="width:100%"
      />

      <!-- New password -->
      <div class="text-h6 font-weight-bold mb-4">New Password</div>
      <v-text-field
        v-model="newPassword"
        :type="showNew ? 'text' : 'password'"
        density="compact"
        placeholder="Enter new password"
        prepend-inner-icon="mdi-lock"
        :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showNew = !showNew"
        class="mb-4"
        style="width:100%"
      />

      <!-- Confirm password -->
      <div class="text-h6 font-weight-bold mb-4">Confirm Password</div>
      <v-text-field
        v-model="confirmPassword"
        :type="showConfirm ? 'text' : 'password'"
        density="compact"
        placeholder="Re-enter new password"
        prepend-inner-icon="mdi-lock"
        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showConfirm = !showConfirm"
        class="mb-6"
        style="width:100%"
      />

      <!-- Confirm Button -->
      <v-btn
        size="small"
        color="primary"
        style="width:100%;"
      >
        Confirm
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router          = useRouter()
const goBack          = () => router.back()
const oldPassword     = ref('')
const newPassword     = ref('')
const confirmPassword = ref('')
const showOld         = ref(false)
const showNew         = ref(false)
const showConfirm     = ref(false)
</script>

<style scoped>
.fill-height { flex: 1; }
</style>
