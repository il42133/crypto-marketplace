<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Assets</v-toolbar-title>
    </v-app-bar>

    <!-- Tabs -->
    <v-tabs v-model="activeTab" background-color="transparent" dark>
      <v-tab value="platform">Platform assets</v-tab>
      <v-tab value="wealth">Wealth management</v-tab>
      <v-tab value="contract">Contract assets</v-tab>
    </v-tabs>

    <!-- Account Balance -->
    <v-row justify="center" class="mt-6">
      <v-col cols="12" class="text-center">
        <div class="subtitle-2 grey--text">
          Account balance (USDT)
          <v-icon small class="ml-2">mdi-eye-off</v-icon>
          <v-icon small class="ml-2">mdi-refresh</v-icon>
        </div>
        <div class="display-2 font-weight-bold mt-2">0.00</div>
      </v-col>
    </v-row>

    <!-- Tab Content -->
    <v-window v-model="activeTab" class="mt-6" hide-delimiter>
      <!-- Platform assets: icon buttons with text below -->
      <v-window-item value="platform">
        <v-row justify="space-around" class="mt-4">
          <v-col cols="3" class="text-center">
            <v-btn
              variant="tonal"
              size="72"
              rounded="circle"
              color="primary"
              :to="{ name: 'Deposit' }"
            >
              <v-icon size="36">mdi-download</v-icon>
            </v-btn>
            <div class="subtitle-2 mt-2 white--text">Deposit</div>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-btn
              variant="tonal"
              size="72"
              rounded="circle"
              color="primary"
              :to="{ name: 'Withdrawal' }"
            >
              <v-icon size="36">mdi-upload</v-icon>
            </v-btn>
            <div class="subtitle-2 mt-2 white--text">Withdraw</div>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-btn
              variant="tonal"
              size="72"
              rounded="circle"
              color="primary"
              :to="{ name: 'Convert' }"
            >
              <v-icon size="36">mdi-swap-horizontal</v-icon>
            </v-btn>
            <div class="subtitle-2 mt-2 white--text">Convert</div>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- Wealth management: single icon button -->
      <v-window-item value="wealth">
        <v-row justify="center" class="mt-4">
          <v-col cols="6" class="text-center">
            <v-btn icon large color="primary" :to="{ name: 'Loans' }">
              <v-icon size="36">mdi-hand-coin</v-icon>
            </v-btn>
            <div class="subtitle-2 mt-2 white--text">Assistance Loan</div>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- Contract assets: single icon button -->
      <v-window-item value="contract">
        <v-row justify="center" class="mt-4">
          <v-col cols="6" class="text-center">
            <v-btn icon large color="primary" :to="{ name: 'Loans' }">
              <v-icon size="36">mdi-hand-coin</v-icon>
            </v-btn>
            <div class="subtitle-2 mt-2 white--text">Assistance Loan</div>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>

    <!-- Asset Details -->
    <div class="text-h6 white--text mt-8 mb-4 text-center">Asset Details</div>
    <v-row>
      <v-col cols="12" v-for="item in assetDetails" :key="item.symbol">
        <v-card class="pa-4 mb-4" dark color="#1e1e2f">
          <v-row align="center">
            <v-col cols="auto">
              <v-icon size="28">{{ item.icon }}</v-icon>
            </v-col>
            <v-col>
              <div class="subtitle-1 white--text">{{ item.name }}</div>
            </v-col>
          </v-row>
          <v-divider class="my-2" />
          <v-row>
            <v-col cols="4" class="text-center">
              <div class="caption grey--text">Available</div>
              <div class="subtitle-2">0.00000</div>
            </v-col>
            <v-col cols="4" class="text-center">
              <div class="caption grey--text">Frozen</div>
              <div class="subtitle-2">0.0000</div>
            </v-col>
            <v-col cols="4" class="text-center">
              <div class="caption grey--text">in (USDT)</div>
              <div class="subtitle-2">0.00000</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('platform')
const assetDetails = [
  { name: 'USDT', symbol: 'USDT', icon: 'mdi-currency-usd' },
  { name: 'BTC',  symbol: 'BTC',  icon: 'mdi-bitcoin' },
  { name: 'ETH',  symbol: 'ETH',  icon: 'mdi-ethereum' },
  { name: 'USDC', symbol: 'USDC', icon: 'mdi-currency-usd' }
]
</script>

<style scoped>
.subtitle-2 { font-size: 0.875rem; }
.white--text { color: #fff !important; }
</style>
