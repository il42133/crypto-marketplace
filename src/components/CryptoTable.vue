<template>
  <v-card>
    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="cryptos"
      class="elevation-1"
      mobile-breakpoint="600"
      hide-default-footer
      :items-per-page="cryptos.length"
    >
      <template #item.current_price="{ item }">
        {{ formatPrice(item.current_price) }}
      </template>

      <template #item.price_change_percentage_24h="{ item }">
        <span
          :class="item.price_change_percentage_24h >= 0
            ? 'text-success'
            : 'text-error'"
        >
          {{ item.price_change_percentage_24h.toFixed(2) }}%
        </span>
      </template>
    </v-data-table>

    <!-- Small footer card -->
    <v-card class="mt-2 pa-2 elevation-1" flat>
      <div class="text-caption text-center">
        Last updated: {{ lastUpdate ? formatDate(lastUpdate) : '—' }}
      </div>
    </v-card>
  </v-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

// Helpers
function formatDate(date) {
  return new Date(date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
function formatPrice(num) {
  return `$${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// Table headers
const headers = [
  { title: 'Currency',    key: 'name',                        align: 'center' },
  { title: 'Symbol',      key: 'symbol',                      align: 'center' },
  { title: 'Price (USD)', key: 'current_price',               align: 'center' },
  {
    title: '24h Change',
    key: 'price_change_percentage_24h',
    align: 'center',
  },
]

// Your frozen top-50 IDs
const frozenIds = [
  'bitcoin','ethereum','tether','binancecoin','solana','usd-coin','ripple','staked-ether',
  'dogecoin','cardano','avalanche-2','tron','shiba-inu','polkadot','wrapped-bitcoin',
  'chainlink','polygon','toncoin','bitcoin-cash','internet-computer','litecoin','uniswap',
  'dai','leo-token','ethereum-classic','aptos','stellar','arbitrum','render-token','near',
  'okb','vechain','mantle','filecoin','monero','injective-protocol','cosmos','hedera-hashgraph',
  'maker','dogwifhat','kaspa','sui','the-graph','quant-network','fetch-ai','theta-token',
  'bitget-token','eos','algorand','elrond-erd-2'
]

const cryptos    = ref([])
const lastUpdate = ref(null)
let intervalId   = null

// Fetch & update data + timestamp
async function loadData() {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      { params: { vs_currency: 'usd', ids: frozenIds.join(',') } }
    )
    cryptos.value = res.data.map((c) => ({
      name: c.name,
      symbol: c.symbol.toUpperCase(),
      current_price: c.current_price,
      price_change_percentage_24h: c.price_change_percentage_24h,
    }))
    lastUpdate.value = new Date()
  } catch (e) {
    console.error('Error fetching market data:', e)
  }
}

onMounted(() => {
  loadData()
  intervalId = setInterval(loadData, 30000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
