<template>
  <div class="table-wrapper">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="text-caption">
          Last updated: {{ lastUpdate ? formatDate(lastUpdate) : '—' }}
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="cryptos"
        class="elevation-1"
        hide-default-footer
        :items-per-page="cryptos.length"
        @click:row="onRowClick"
      >
        <template #item.price="{ item }">
          {{ formatPrice(item.price) }}
        </template>
        <template #item.change="{ item }">
          <span :class="item.change >= 0 ? 'text-success' : 'text-error'">
            {{ item.change.toFixed(2) }}%
          </span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

// Router for navigation to detail page
const router = useRouter()

// Reactive state
const cryptos = ref([])
const lastUpdate = ref(null)

// Table headers
const headers = [
  { title: 'Currency',    key: 'name',   align: 'center' },
  { title: 'Symbol',      key: 'symbol', align: 'center' },
  { title: 'Price (USD)', key: 'price',  align: 'center' },
  { title: '24h Change',  key: 'change', align: 'center' },
]

// Subscribe to Firestore collection 'coinPrices'
const unsubscribe = onSnapshot(
  collection(db, 'coinPrices'),
  (snapshot) => {
    cryptos.value = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id:     doc.id,
        name:   data.name,
        symbol: data.symbol,
        price:  data.price,
        change: data.change || 0,
      }
    })
    lastUpdate.value = new Date()
  },
  (error) => {
    console.error('Firestore error:', error)
  }
)

// Clean up listener on unmount
onUnmounted(() => {
  unsubscribe()
})

// Navigate to dynamic coin detail
function onRowClick(event, row) {
  const coin = row.item
  router.push({ name: 'coinDetail', params: { id: coin.id } })
}

// Format helpers
function formatDate(date) {
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
function formatPrice(value) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
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
:deep(.v-data-table thead th) {
  text-align: center;
}
</style>
