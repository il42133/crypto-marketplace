<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App bar with back + title + help icon -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Primary Verification</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-headset</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Form content -->
    <v-container class="pa-4">
      <v-alert type="info" dense text class="mb-6">
        <v-icon left>mdi-information-outline</v-icon>
        In order to ensure a safe account experience, please verify your information.
      </v-alert>

      <v-text-field
        label="Name"
        placeholder="Please enter"
        outlined
        dense
        class="mb-4"
      />

      <v-text-field
        label="ID Number"
        placeholder="Please enter"
        outlined
        dense
        class="mb-8"
      />

      <v-btn block color="primary" large>
        Submit
      </v-btn>
    </v-container>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => router.back()
</script>

<style scoped>
/* optional: stretch container so bottom nav doesn’t overlap */
.fill-height { flex: 1; }
</style>
