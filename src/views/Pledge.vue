<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Pledge Mining</v-toolbar-title>
      <v-spacer />
      <!-- Gameplay Description Trigger -->
      <v-btn text class="ml-2" @click="dialog = true">
        <v-icon left>mdi-information-outline</v-icon>
        Gameplay Description
      </v-btn>
    </v-app-bar>

    <!-- Title & Subtitle -->
    <v-row justify="center" class="mt-6">
      <v-col cols="12" class="text-center">
        <div class="display-1 font-weight-bold">
          MOONEX <span class="purple--text">Pledge</span> Mining
        </div>
        <div class="subtitle-1 grey--text mt-2">
          Ultra high yield One click DeFi
        </div>
      </v-col>
    </v-row>

    <!-- Description Text -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" md="8">
        <p class="body-1 grey--text text-center">
          MOONEX provides comprehensive digital assets A global user ecosystem based on
          decentralization Smart contract technology
        </p>
      </v-col>
    </v-row>

    <!-- Illustration -->
    <v-row justify="center" class="mt-6">
      <v-col cols="12" md="6">
        <v-img
          :src="mining"
          alt="Pledge Mining"
          contain
          height="240"
        />
      </v-col>
    </v-row>

    <!-- Pledge Records Button -->
    <v-btn
      block
      large
      color="green darken-1"
      class="mt-8"
      :to="{ name: 'PledgeRecords' }"
    >
      <v-icon left>mdi-clock-outline</v-icon>
      Pledge Records
      <v-spacer />
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

    <!-- Stats Section -->
    <div class="text-h6 white--text text-center mt-8">Data Overview</div>
    <v-row dense align="stretch" class="mt-8">
      <v-col cols="6" class="d-flex" v-for="(item, i) in statsGrid" :key="i">
        <v-card class="flex-grow-1 pa-4" dark color="#1e1e2f">
          <div class="text-h6 white--text">{{ item.label }}</div>
          <div class="display-2 font-weight-bold mt-2">{{ item.value }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pledge Positions Section -->
    <div class="text-h6 white--text text-center mt-8 mb-4">Pledge Positions</div>
    <v-row dense class="mb-8">
      <v-col cols="12" v-for="(pos, idx) in pledgePositions" :key="idx">
        <v-card class="pa-4 mb-4" dark color="#1e1e2f">
          <!-- Header: index badge, asset, buy button -->
          <v-row align="center">
            <v-col cols="auto">
              <v-sheet color="#7c4dff" class="white--text px-3 py-1 rounded">
                {{ (idx+1) < 10 ? '0' + (idx+1) : idx+1 }}
              </v-sheet>
            </v-col>
            <v-col>
              <div class="subtitle-1 white--text">{{ pos.asset }}</div>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-btn outlined color="primary" small>Buy</v-btn>
            </v-col>
          </v-row>

          <!-- Return Rate -->
          <div class="mt-2 grey--text">Rate of Return</div>
          <div class="subtitle-1 green--text font-weight-bold">{{ pos.rate }}</div>

          <v-divider class="my-3" />

          <!-- Details: limit, days, available -->
          <v-row>
            <v-col cols="4" class="grey--text">
              <div>Limit</div>
              <div class="subtitle-2 font-weight-bold">{{ pos.limit }}</div>
            </v-col>
            <v-col cols="4" class="grey--text">
              <div>Days</div>
              <div class="subtitle-2 font-weight-bold">{{ pos.days }}</div>
            </v-col>
            <v-col cols="4" class="grey--text">
              <div>Available</div>
              <div class="subtitle-2 font-weight-bold">{{ pos.available }}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Gameplay Description Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card dark color="#1e1e2f">
        <v-card-title class="headline">Gameplay Description</v-card-title>
        <v-card-text>
          <!-- Add your detailed description text here -->
          <p class="body-2 white--text">
            <!-- Placeholder -->
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import mining from '../assets/mining.png'

// Dialog state
const dialog = ref(false)

const statsGrid = [
  { label: 'Total Staked',    value: '0.00 USDT' },
  { label: 'Earnings Today',   value: '0.00 USDT' },
  { label: 'Total Rewards',    value: '0.00 USDT' },
  { label: 'Active Positions', value: '0' }
]

const pledgePositions = [
  { asset: 'USDT', rate: '0.3%~0.5%', limit: '10~500', days: '7', available: '10' },
  { asset: 'USDT', rate: '0.4%~0.75%', limit: '500~2000', days: '15', available: '100' },
  { asset: 'USDT', rate: '0.6%~1.0%', limit: '1000~50000', days: '30', available: '100' },
  { asset: 'USDT', rate: '1.0%~1.5%', limit: '1000~100000', days: '60', available: '100' },
  { asset: 'BTC', rate: '1.5%~2.1%', limit: '0.001~5', days: '1', available: '10' }
]
</script>

<style scoped>
.purple--text { color: #7c4dff; }
.white--text { color: #fff !important; }
</style>
