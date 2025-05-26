<template>
  <div class="table-wrapper">
    <v-card>
      <v-card-title class="d-flex flex-column flex-sm-row align-center justify-space-between">
        <!-- Left side: Last updated text -->
        <div class="text-caption mb-2 mb-sm-0">
          Last updated: {{ lastUpdate ? formatDate(lastUpdate) : '—' }}
        </div>

        <!-- Right side: bigger search + smaller override button -->
        <div class="d-flex align-center">
          <v-text-field
            v-model="searchTerm"
            placeholder="Search…"
            dense
            hide-details
            append-inner-icon="mdi-magnify"
            class="mr-4"
            style="max-width: 300px"
          />
          <v-btn
            v-if="authStore.isAdmin"
            color="primary"
            @click="goToOverrides"
            x-small
          >
            Override
          </v-btn>
        </div>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredCryptos"
        class="elevation-1"
        hide-default-footer
        :items-per-page="filteredCryptos.length"
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

    <v-bottom-navigation
    v-model="activeTab"
    color="primary"
    grow
    style="position: fixed; bottom: 0; left: 0; right: 0;"
  >
    <v-btn
      value="home"
      @click="() => router.push({ path: '/' })"
    >
      <v-icon size="20">mdi-home</v-icon>
      Home
    </v-btn>

    <v-btn
      value="markets"
      @click="() => router.push({ path: '/markets' })"
    >
      <v-icon size="20">mdi-chart-line</v-icon>
      Markets
    </v-btn>

    <v-btn
      value="trade"
      @click="() => router.push({ name: 'coinDetail', params: { id: 'bitcoin' } })"
    >
      <v-icon size="20">mdi-swap-horizontal</v-icon>
      Trade
    </v-btn>

    <v-btn
      value="pledge"
      @click="() => router.push({ path: '/pledge' })"
    >
      <v-icon size="20">mdi-pickaxe</v-icon>
      Pledge
    </v-btn>

    <v-btn
      value="assets"
      @click="() => router.push({ name: 'Assets' })"
    >
      <v-icon size="20">mdi-wallet</v-icon>
      Assets
    </v-btn>
  </v-bottom-navigation>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

// Router & Auth
const router = useRouter()
const activeTab = ref('markets')
const authStore = useAuthStore()

// State
const cryptos    = ref([])
const lastUpdate = ref(null)
const searchTerm = ref('')

// Filtered items
const filteredCryptos = computed(() =>
  cryptos.value.filter(c =>
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    c.symbol.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)

// Table headers
const headers = [
  { title: 'Currency',    key: 'name',   align: 'center' },
  { title: 'Symbol',      key: 'symbol', align: 'center' },
  { title: 'Price (USD)', key: 'price',  align: 'center' },
  { title: '24h Change',  key: 'change', align: 'center' },
]

// Firestore listener
let unsubscribeFn = null
onMounted(() => {
  const priceQuery = query(
    collection(db, 'coinPrices'),
    orderBy('price', 'desc')
  )
  unsubscribeFn = onSnapshot(priceQuery, snap => {
    cryptos.value = snap.docs.map(d => {
      const data = d.data()
      return {
        id:     d.id,
        name:   data.name,
        symbol: data.symbol,
        price:  data.price,
        change: data.change || 0,
      }
    })
    const times = snap.docs
      .map(d => d.data().lastFetched)
      .filter(ts => ts)
      .map(ts => ts.toDate().getTime())
    lastUpdate.value = times.length
      ? new Date(Math.max(...times))
      : null
  })
})
onUnmounted(() => unsubscribeFn && unsubscribeFn())

// Navigation
function onRowClick(_, { item }) {
  router.push({ name: 'coinDetail', params: { id: item.id } })
}
function goToOverrides() {
  router.push({ name: 'AdminOverrides' })
}

// Helpers
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
