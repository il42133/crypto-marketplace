<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>My Investments</v-toolbar-title>
    </v-app-bar>

    <!-- Transaction Statistics -->
    <div class="text-h6 white--text mt-4 mb-2">Transaction Statistics</div>
    <v-row dense align="stretch">
      <v-col
        cols="6"
        class="d-flex"
        v-for="(stat, i) in stats"
        :key="i"
      >
        <v-card class="pa-4 mb-4 flex-grow-1" dark color="#1e1e2f">
            <div class="text-h5">{{ stat.value }}</div>
            <div class="caption grey--text">{{ stat.label }}</div>
        </v-card>
      </v-col>
    </v-row>
    <!-- Divider & Title -->
    <div class="text-subtitle-1 white--text my-6 text-center">
      — Transaction Records —
    </div>

    <!-- Empty State Placeholder -->
    <v-row justify="center" class="mt-8">
      <v-col cols="12" class="text-center">
        <span class="grey--text">You haven’t made any investments yet.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue'

const stats = reactive([
  { label: 'Total Input Value (USDT)',    value: 0 },
  { label: 'Earn Rewards Same Day (USDT)', value: 0 },
  { label: 'Accumulated Income (USDT)',    value: 0 },
  { label: 'Number of Positions Held',     value: 0 }
])

</script>

<style scoped>
.white--text { color: #fff !important; }
</style>
