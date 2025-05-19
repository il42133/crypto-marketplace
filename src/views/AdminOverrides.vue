<template>
  <v-container>
    <!-- Home Button -->
    <v-btn text @click="goHome" class="mb-4">
      Home
    </v-btn>
    <h1>Admin Price Overrides</h1>
    <v-data-table
      :headers="headers"
      :items="coins"
      class="elevation-1"
      hide-default-footer
      :items-per-page="coins.length"
      dense
    >
      <template #item.price="{ item }">
        {{ formatPrice(item.price) }}
      </template>
      <template #item.overrideValue="{ item }">
        <v-text-field
          v-model="overrideMap[item.id]"
          type="number"
          placeholder="Input override value"
          hide-details
          dense
          style="max-width: 200px"
        />
      </template>
      <template #item.actions="{ item }">
        <v-btn small color="primary" @click="saveOverride(item)">
          Save
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'

// Ensure only admins can access
const auth = useAuthStore()
if (!auth.isAdmin) throw new Error('Not authorized')

const router = useRouter()
const coins = ref([])
const overrideMap = ref({})

// Table headers (Vuetify 3 title/key)
const headers = [
  { title: 'Name',          key: 'name' },
  { title: 'Symbol',        key: 'symbol' },
  { title: 'Current Price', key: 'price' },
  { title: 'Override',      key: 'overrideValue', sortable: false },
  { title: 'Actions',       key: 'actions',       sortable: false },
]

let unsubscribeFn
onMounted(() => {
  const priceQuery = query(
    collection(db, 'coinPrices'),
    orderBy('price', 'desc')
  )
  unsubscribeFn = onSnapshot(priceQuery, snapshot => {
    coins.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    // Initialize override inputs
    coins.value.forEach(c => {
      if (!(c.id in overrideMap.value)) {
        overrideMap.value[c.id] = c.source === 'admin' ? c.price : ''
      }
    })
  })
})

onUnmounted(() => {
  if (unsubscribeFn) unsubscribeFn()
})

// Navigate back to dashboard
function goHome() {
  router.push({ path: '/' })
}

// Save override; include adminEmail and clear input
async function saveOverride(coin) {
  const val = parseFloat(overrideMap.value[coin.id])
  if (isNaN(val)) return
  const refDoc = doc(db, 'coinPrices', coin.id)
  const adminEmail = auth.user?.email || 'unknown'
  await updateDoc(refDoc, {
    price:       val,
    source:      'admin',
    lastUpdated: serverTimestamp(),
    adminEmail:  adminEmail,
  })
  overrideMap.value[coin.id] = ''
}

// Format price as USD
function formatPrice(value) {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
</style>
