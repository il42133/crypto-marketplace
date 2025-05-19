<template>
  <v-container>
    <!-- Home Button -->
    <v-btn text @click="goHome" class="mb-4">
      Home
    </v-btn>

    <h1 class="mb-4">Admin Override Logs</h1>

    <v-data-table
      :headers="headers"
      :items="logs"
      class="elevation-1"
      dense
      hide-default-footer
      :items-per-page="logs.length"
    >
      <template #item.timestamp="{ item }">
        {{ formatDate(item.timestamp) }}
      </template>
      <template #item.beforePrice="{ item }">
        {{ formatCurrency(item.beforePrice) }}
      </template>
      <template #item.afterPrice="{ item }">
        {{ formatCurrency(item.afterPrice) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

// Only admins can see this page
const auth = useAuthStore()
if (!auth.isAdmin) {
  throw new Error('Not authorized')
}

const router = useRouter()
const logs = ref([])

// Table column definitions
const headers = [
  { title: 'Timestamp', key: 'timestamp', align: 'center' },
  { title: 'Coin ID',   key: 'coinId',    align: 'center' },
  { title: 'Before',    key: 'beforePrice', align: 'center' },
  { title: 'After',     key: 'afterPrice',  align: 'center' },
  { title: 'Admin',     key: 'adminEmail',  align: 'center' },
]

let unsubscribeFn
onMounted(() => {
  // Listen for logs, sorted newest-first
  const logsQuery = query(
    collection(db, 'coinPriceLogs'),
    orderBy('timestamp', 'desc')
  )
  unsubscribeFn = onSnapshot(
    logsQuery,
    (snap) => {
      logs.value = snap.docs.map(doc => {
        const d = doc.data()
        return {
          id:          doc.id,
          coinId:      d.coinId,
          timestamp:   d.timestamp?.toDate() || null,
          beforePrice: d.beforePrice,
          afterPrice:  d.afterPrice,
          adminEmail:  d.adminEmail,
        }
      })
    },
    (err) => {
      console.error('Error fetching logs:', err)
    }
  )
})

onUnmounted(() => {
  if (unsubscribeFn) unsubscribeFn()
})

// Go back to dashboard
function goHome() {
  router.push({ path: '/' })
}

// Format JS Date objects
function formatDate(d) {
  return d
    ? d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : '—'
}

// Prefix with $ and two decimal places
function formatCurrency(value) {
  return value != null
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '—'
}
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
  margin-bottom: 16px;
}
</style>
