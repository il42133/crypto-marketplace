<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Deposit</v-toolbar-title>
    </v-app-bar>

    <!-- Asset List -->
    <v-list two-line shaped dense>
      <v-list-item
        v-for="asset in assets"
        :key="asset.symbol"
        :to="{ name: 'DepositDetail', params: { asset: asset.route } }"
        :prepend-icon="asset.icon"
        append-icon="mdi-chevron-right"
        clickable
      >
        <v-list-item-title>{{ asset.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ asset.symbol }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <!-- History Button -->
    <v-btn
      block
      outlined
      class="mt-6"
      color="green darken-1"
      @click="$router.push({ name: 'DepositHistory' })"
    >
      <v-icon left>mdi-clock-outline</v-icon>
      Deposit History
      <v-spacer />
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const assets = [
  { name: 'BTC',       symbol: 'BTC',       icon: 'mdi-bitcoin',   route: 'btc' },
  { name: 'USDT-ERC',  symbol: 'USDT-ERC',  icon: 'mdi-currency-usd', route: 'usdt_erc' },
  { name: 'ETH',       symbol: 'ETH',       icon: 'mdi-ethereum',   route: 'eth' },
  { name: 'USDT-TRC',  symbol: 'USDT-TRC',  icon: 'mdi-currency-usd', route: 'usdt_trc' },
  { name: 'USDC',      symbol: 'USDC',      icon: 'mdi-currency-usd', route: 'usdc' },
]

</script>

<style scoped>
.pa-4 { padding: 16px !important; }
</style>
