<template>
  <div class="table-wrapper">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="cryptos"
        class="elevation-1"
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

      <v-card class="mt-2 pa-2 elevation-1" flat>
        <div class="text-caption text-center">
          Last updated: {{ lastUpdate ? formatDate(lastUpdate) : '—' }}
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

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

const frozenIds = [ /* your 50 IDs… */ ]

const cryptos    = ref([])
const lastUpdate = ref(null)
let intervalId   = null

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

async function loadData() {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      { params: { vs_currency: 'usd', ids: frozenIds.join(',') } }
    )
    cryptos.value = res.data.map(c => ({
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

<style scoped>
.table-wrapper {
  width: 100%;
  max-width: 95vw;
  margin: 0 auto;
}
@media (min-width: 800px) {
  .table-wrapper {
    max-width: 50vw;
  }
}
:deep(.v-data-table thead th) {
  text-align: center;
}
</style>
