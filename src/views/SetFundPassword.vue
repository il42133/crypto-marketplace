<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-toolbar-title>Set Fund password</v-toolbar-title>
      <v-spacer />
      <v-btn icon><v-icon>mdi-headset</v-icon></v-btn>
    </v-app-bar>

    <!-- Compact form -->
    <v-container
      class="pa-4 d-flex flex-column align-center"
      style="max-width:360px; margin:0 auto;"
    >
      <!-- New Fund Password -->
      <div class="text-h6 font-weight-bold mb-4">New Fund Password</div>
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        density="compact"
        placeholder="Enter password"
        prepend-inner-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        class="mb-4"
        style="width:100%"
      />

      <!-- Confirm Button -->
      <v-btn
        size="small"
        color="primary"
        style="width:100%"
        @click="confirm"
      >
        Confirm
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router       = useRouter()
const goBack       = () => router.back()
const password     = ref('')
const showPassword = ref(false)

function confirm() {
  // placeholder
  console.log('Fund password set to', password.value)
}
</script>

<style scoped>
.fill-height { flex: 1; }
</style>
