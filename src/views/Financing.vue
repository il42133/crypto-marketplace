<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App Bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Financing</v-toolbar-title>
      <v-spacer/>
    </v-app-bar>

    <!-- Top Shortcut Icons -->
    <v-container class="pa-4">
      <v-row justify="space-around">
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary"><v-icon>mdi-chart-line</v-icon></v-btn>
          <div class="caption mt-1">Value added benefits</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary"><v-icon>mdi-star-outline</v-icon></v-btn>
          <div class="caption mt-1">Membership zone</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary" @click="() => router.push({ path: '/products' })"><v-icon>mdi-cube-outline</v-icon></v-btn>
          <div class="caption mt-1">Ordinary products</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary" @click="() => router.push({ path: '/investments' })"><v-icon>mdi-wallet-outline</v-icon></v-btn>
          <div class="caption mt-1">My investments</div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Product Cards -->
    <v-container class="px-4" fluid>
      <v-card
        v-for="prod in products"
        :key="prod.id"
        class="mb-6 mx-auto pa-4"
        style="max-width: 600px; width: 100%;"
        elevation="2"
      >
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-currency-usd</v-icon>
            {{ prod.title }}
          </div>
          <v-btn small color="primary" @click="goDetails(prod.id)">
            Immediate participation
          </v-btn>
        </div>

        <div class="mt-4">
          <div class="subtitle-2">Rate of Return</div>
          <div class="text-h5 font-weight-bold green--text">
            {{ prod.rate }} %
          </div>
        </div>

        <v-row class="mt-4" dense>
          <v-col cols="6">Initial investment amount:</v-col>
          <v-col cols="6" class="text-right">{{ prod.min }} USDT</v-col>

          <v-col cols="6">Limited investment amount:</v-col>
          <v-col cols="6" class="text-right">{{ prod.max }} USDT</v-col>

          <v-col cols="6">Lockout days:</v-col>
          <v-col cols="6" class="text-right">{{ prod.days }}</v-col>
        </v-row>

        <v-progress-linear
          class="mt-4"
          :model-value="prod.progress"
          color="green"
          height="6"
        />
        <div class="mt-1 text-right">
          Project progress: {{ prod.progress }} %
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()

// Define your two financing “plans”
const products = [
  {
    id: 'plan1',
    title: 'USDT Smart contract',
    rate: 0.75,
    min: 500,
    max: 200000,
    days: 15,
    progress: 25,
  },
  {
    id: 'plan2',
    title: 'USDT Smart contract',
    rate: 3,
    min: 10000,
    max: 500000,
    days: 30,
    progress: 24,
  },
  {
    id: 'plan3',
    title: 'USDT Smart contract',
    rate: 5,
    min: 50000,
    max: 1000000,
    days: 60,
    progress: 90,
  },
  {
    id: 'plan4',
    title: 'USDT Smart contract',
    rate: 7,
    min: 100000,
    max: 2000000,
    days: 120,
    progress: 75,
  },
]

// Navigate to the detail page for a given plan
function goDetails(id) {
  router.push({ name: 'FinancingDetails', params: { id } })
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.green--text {
  color: #4caf50 !important;
}
</style>
