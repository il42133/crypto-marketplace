<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Pledge Records</v-toolbar-title>
    </v-app-bar>

    <!-- Tabs -->
    <v-tabs v-model="tab" background-color="transparent" dark>
      <v-tab value="all">All</v-tab>
      <v-tab value="inprogress">In Progress</v-tab>
      <v-tab value="completed">Completed</v-tab>
      <v-tab value="redeemed">Redeemed</v-tab>
    </v-tabs>

    <!-- Tab Content -->
    <v-window v-model="tab" class="mt-4" hide-delimiter>
      <v-window-item value="all">
        <div class="text-center grey--text mt-8">No records found.</div>
      </v-window-item>
      <v-window-item value="inprogress">
        <div class="text-center grey--text mt-8">No in-progress pledges.</div>
      </v-window-item>
      <v-window-item value="completed">
        <div class="text-center grey--text mt-8">No completed pledges.</div>
      </v-window-item>
      <v-window-item value="redeemed">
        <div class="text-center grey--text mt-8">No redeemed pledges.</div>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Tab keys correspond to the values on <v-tab>
const tab = ref('all')
</script>

<style scoped>
.text-center { text-align: center; }
</style>
