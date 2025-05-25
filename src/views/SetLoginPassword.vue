<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Set login password</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-headset</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Form content -->
    <v-container class="pa-4 flex-grow-1">
      <!-- Old password -->
      <v-text-field
        v-model="oldPassword"
        :type="showOld ? 'text' : 'password'"
        label="Old password"
        placeholder="Please enter"
        outlined
        dense
        prepend-inner-icon="mdi-lock"
        :append-icon="showOld ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showOld = !showOld"
        class="mb-4"
      />

      <!-- New password -->
      <v-text-field
        v-model="newPassword"
        :type="showNew ? 'text' : 'password'"
        label="New password"
        placeholder="Please enter"
        outlined
        dense
        prepend-inner-icon="mdi-lock"
        :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showNew = !showNew"
        class="mb-4"
      />

      <!-- Confirm password -->
      <v-text-field
        v-model="confirmPassword"
        :type="showConfirm ? 'text' : 'password'"
        label="Confirm password"
        placeholder="Please enter"
        outlined
        dense
        prepend-inner-icon="mdi-lock"
        :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showConfirm = !showConfirm"
        class="mb-8"
      />

      <!-- Buttons -->
      <v-btn block color="primary" large class="mb-4">
        Confirm
      </v-btn>
      <div class="text-center">
        <v-btn text small @click="modifyByEmail">
          Modify using email
        </v-btn>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router        = useRouter()
const goBack        = () => router.back()
const modifyByEmail = () => { /* future hook */ }

// password models
const oldPassword     = ref('')
const newPassword     = ref('')
const confirmPassword = ref('')

// visibility toggles
const showOld     = ref(false)
const showNew     = ref(false)
const showConfirm = ref(false)
</script>

<style scoped>
.fill-height { flex: 1; }
</style>
