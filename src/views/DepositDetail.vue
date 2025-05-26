<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <v-app-bar dense flat color="primary" dark>
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="text-h6">Recharge {{ info.name }}</v-toolbar-title>
      </v-app-bar>

      <!-- QR Code -->
      <v-row justify="center" class="my-4">
        <v-col cols="10">
          <v-img
            src="../src/assets/qr.png"
            alt="QR Code"
            contain
            height="200"
          />
        </v-col>
      </v-row>

      <!-- Address & Copy -->
      <v-text-field
        v-model="info.address"
        :label="`Recharge address (${info.symbol})`"
        readonly
        outlined
        dense
        hide-details
        append-inner-icon="mdi-content-copy"
        @click:append-inner="copyAddress"
      />

      <!-- Amount -->
      <v-text-field
        v-model="amount"
        label="Recharge amount (USDT)"
        type="number"
        outlined
        dense
        class="mt-4"
        hide-details
      />

      <!-- Upload Screenshot -->
      <v-file-input
        v-model="screenshot"
        label="Upload screenshot of payment"
        outlined
        dense
        class="mt-4"
        hide-details
      />

      <!-- Confirm -->
      <v-btn
        block
        large
        color="primary"
        class="mt-6"
        @click="confirmRecharge"
      >
        Confirm recharge
      </v-btn>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Simulated asset info map
const assetMap = {
  btc:  { name: 'BTC', symbol: 'BTC', address: '3JzsJoEiUvUahDLHRSK5Pf7iV3jwpkp9jc' },
  eth:  { name: 'ETH', symbol: 'ETH', address: '0xAbC12345Efgh6789IjKlMnOpQrStUvWxYz' },
  usdt_erc: { name: 'USDT-ERC', symbol: 'USDT-ERC', address: '0x12Ab34Cd56Ef78Gh90IjKlMnOpQrStUvWx' },
  usdt_trc: { name: 'USDT-TRC', symbol: 'USDT-TRC', address: 'TM1a2B3c4D5e6F7g8H9i0JkLmNoPqRsTuV' },
  usdc: { name: 'USDC', symbol: 'USDC', address: '0xFfEeDdCcBbAa99887766554433221100Aa' },
}

// Grab the `asset` param from the route
const route = useRoute()
const assetKey = route.params.asset?.toString().toLowerCase() || 'btc'

// Fallback to BTC if unknown
const info = computed(() => assetMap[assetKey] || assetMap.btc)

// Form refs
const amount     = ref(null)
const screenshot = ref(null)


function copyAddress() {
  navigator.clipboard.writeText(referralCode.value)
}

function confirmRecharge() {
  console.log(
    `Recharging ${info.value.symbol}:`,
    { amount: amount.value, screenshot: screenshot.value }
  )
}

</script>

<style scoped>
.white--text { color: #fff !important; }
</style>
