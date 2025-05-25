<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Set Fund password</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-headset</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Body -->
    <v-container class="pa-4">
      <v-text-field
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        label="New Fund Password"
        placeholder="Enter password"
        outlined
        dense
        prepend-inner-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
        class="mb-8"
      />

      <v-btn block color="primary" large>
        Confirm
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()

// reactive for password visibility
const password     = ref('')
const showPassword = ref(false)
</script>

<style scoped>
.fill-height { flex: 1; }
</style>
