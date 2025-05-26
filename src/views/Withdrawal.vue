<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Withdrawal</v-toolbar-title>
    </v-app-bar>

    <!-- Asset List -->
    <v-list two-line shaped dense>
      <v-list-item v-for="asset in assets" :key="asset.symbol">
        <v-card
          class="w-100 pa-3 d-flex align-center justify-space-between"
          :to="{ name: 'WithdrawalDetail', params: { asset: asset.route } }"
          clickable
        >
          <div class="d-flex align-center">
            <v-icon size="36">{{ asset.icon }}</v-icon>
            <span class="ml-4 subtitle-2">{{ asset.name }}</span>
          </div>
          <v-icon>mdi-chevron-right</v-icon>
        </v-card>
      </v-list-item>
    </v-list>

    <!-- History Button -->
    <v-btn
      block
      outlined
      class="mt-6"
      color="green darken-1"
      :to="{ name: 'WithdrawalHistory' }"
    >
      <v-icon left>mdi-clock-outline</v-icon>
      Withdrawal History
      <v-spacer />
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
const assets = [
  { name: 'BTC',       symbol: 'BTC',       icon: 'mdi-bitcoin',    route: 'btc' },
  { name: 'USDT-ERC',  symbol: 'USDT-ERC',  icon: 'mdi-currency-usd', route: 'usdt_erc' },
  { name: 'ETH',       symbol: 'ETH',       icon: 'mdi-ethereum',    route: 'eth' },
  { name: 'USDT-TRC',  symbol: 'USDT-TRC',  icon: 'mdi-currency-usd', route: 'usdt_trc' },
  { name: 'USDC',      symbol: 'USDC',      icon: 'mdi-currency-usd', route: 'usdc' },
]
</script>

<style scoped>
.pa-4 { padding: 16px !important; }
</style>
