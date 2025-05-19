<template>
  <div class="table-wrapper">
    <v-card>
      <v-card-title class="d-flex flex-column flex-sm-row align-center justify-space-between">
        <div class="text-caption mb-2 mb-sm-0">
          Last updated: {{ lastUpdate ? formatDate(lastUpdate) : '—' }}
        </div>
        <!-- Show button only for admins -->
        <v-btn
          v-if="authStore.isAdmin"
          color="primary"
          @click="goToOverrides"
          small
        >
          Admin Overrides
        </v-btn>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuthStore } from '../stores/auth.js'

// Router & Auth store
const router = useRouter()
const authStore = useAuthStore()

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

// Subscribe to Firestore sorted by price on mount
let unsubscribeFn = null
onMounted(() => {
  const priceQuery = query(
    collection(db, 'coinPrices'),
    orderBy('price', 'desc')
  )
  unsubscribeFn = onSnapshot(
    priceQuery,
    (snapshot) => {
      // Map document data
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
      // Compute lastUpdate from Firestore timestamps
      const fetchedDates = snapshot.docs
        .map(doc => doc.data().lastFetched)
        .filter(ts => ts)
        .map(ts => ts.toDate().getTime())
      lastUpdate.value = fetchedDates.length
        ? new Date(Math.max(...fetchedDates))
        : null
    },
    (error) => {
      console.error('Firestore error:', error)
    }
  )
})

// Cleanup on unmount
onUnmounted(() => {
  if (unsubscribeFn) unsubscribeFn()
})

// Navigation handlers
function onRowClick(event, row) {
  router.push({ name: 'coinDetail', params: { id: row.item.id } })
}
function goToOverrides() {
  router.push({ name: 'AdminOverrides' })
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
  padding: 4px;
}

:deep(.v-data-table thead th) {
  text-align: center;
}
</style>
