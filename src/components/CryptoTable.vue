<template>
  <div class="table-wrapper">
    <v-card>
      <!-- Header: Last updated & Refresh -->
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-caption">
          Last updated: {{ lastUpdate ? formatDate(lastUpdate) : '—' }}
        </div>
        <v-btn text small @click="loadData">Refresh</v-btn>
      </v-card-title>

      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="cryptos"
        class="elevation-1"
        hide-default-footer
        :items-per-page="cryptos.length"
        @click:row="onRowClick"
      >
        <template #item.current_price="{ item }">
          {{ formatPrice(item.current_price) }}
        </template>

        <template #item.price_change_percentage_24h="{ item }">
          <span :class="item.price_change_percentage_24h >= 0 ? 'text-success' : 'text-error'">
            {{ item.price_change_percentage_24h.toFixed(2) }}%
          </span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

// Table headers
const headers = [
  { title: 'Currency', key: 'name', align: 'center' },
  { title: 'Symbol', key: 'symbol', align: 'center' },
  { title: 'Price (USD)', key: 'current_price', align: 'center' },
  { title: '24h Change', key: 'price_change_percentage_24h', align: 'center' },
]

// Static top-50 coin IDs
const frozenIds = [
  'bitcoin','ethereum','tether','binancecoin','solana','usd-coin','ripple','staked-ether',
  'dogecoin','cardano','avalanche-2','tron','shiba-inu','polkadot','wrapped-bitcoin',
  'chainlink','polygon','toncoin','bitcoin-cash','internet-computer','litecoin','uniswap',
  'dai','leo-token','ethereum-classic','aptos','stellar','arbitrum','render-token','near',
  'okb','vechain','mantle','filecoin','monero','injective-protocol','cosmos','hedera-hashgraph',
  'maker','dogwifhat','kaspa','sui','the-graph','quant-network','fetch-ai','theta-token',
  'bitget-token','eos','algorand','elrond-erd-2'
]

// Reactive state
const cryptos = ref([])
const lastUpdate = ref(null)
let intervalId = null

// Format timestamp for display
function formatDate(date) {
  return new Date(date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

// Format price as USD currency
function formatPrice(num) {
  return `$${num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

// Fetch market data for frozen IDs
async function loadData() {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      { params: { vs_currency: 'usd', ids: frozenIds.join(',') } }
    )
    cryptos.value = res.data.map(c => ({
      id:      c.id,
      name:    c.name,
      symbol:  c.symbol.toUpperCase(),
      current_price: c.current_price,
      price_change_percentage_24h: c.price_change_percentage_24h,
    }))
    lastUpdate.value = new Date()
  } catch (e) {
    console.error('Error fetching market data:', e)
  }
}

// Navigate to detail page on row click
function onRowClick(event, row) {
  // row.item is your coin object
  const coin = row.item
  console.log('clicked on', coin.id)      // sanity check
  router.push({ name: 'coinDetail', params: { id: coin.id } })
}

// Auto-refresh logic
onMounted(() => {
  loadData()
  intervalId = setInterval(loadData, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
}
@media (min-width: 600px) {
  .table-wrapper {
    max-width: 50vw;
  }
}

/* Center headers */
:deep(.v-data-table thead th) {
  text-align: center;
}
</style>
