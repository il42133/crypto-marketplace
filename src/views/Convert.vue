<template>
  <v-container fluid class="pa-0 d-flex flex-column fill-height">
    <!-- App Bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Convert</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <!-- Main card -->
    <v-card class="mx-auto my-4 pa-4" elevation="2" style="max-width: 600px; width: 90vw;">
      <!-- From / To selectors -->
      <div class="d-flex align-center mb-4">
        <v-select
          v-model="selectedFrom"
          :items="currencyOptions"
          item-title="label"
          item-value="value"
          label="From"
          dense
          outlined
          class="mr-4"
          style="max-width: 140px;"
        />
        <v-text-field
          v-model="amount"
          label="Amount"
          placeholder="0.00"
          dense
          outlined
          style="flex:1;"
        />
      </div>

      <div class="d-flex align-center mb-6">
        <v-select
          v-model="selectedTo"
          :items="currencyOptions"
          item-title="label"
          item-value="value"
          label="To"
          dense
          outlined
          class="mr-4"
          style="max-width: 140px;"
        />
        <div class="text-h6" style="flex:1; text-align: right;">
          {{ convertedAmount }}
        </div>
      </div>

      <!-- Rate display -->
      <v-card class="mb-6 pa-2" outlined>
        {{ rateText }}
      </v-card>

      <!-- Available balance -->
      <v-card class="mb-6 pa-2" outlined>
        Available balance ({{ fromLabel }}) : 0.00
      </v-card>

      <!-- Convert button -->
      <v-btn block color="primary" large @click="convert">
        Convert
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const goBack = () => router.back()

// Currency list
const currencyOptions = [
  { label: 'BTC',     value: 'bitcoin'       },
  { label: 'ETH',     value: 'ethereum'      },
  { label: 'LTC',     value: 'litecoin'      },
  { label: 'stETH',   value: 'staked-ether'  },
  { label: 'MKR',     value: 'maker'         },
  { label: 'BNB',     value: 'binancecoin'   },
  { label: 'XMR',     value: 'monero'        },
  { label: 'SOL',     value: 'solana'        },
]

// State
const selectedFrom = ref('bitcoin')
const selectedTo   = ref('ethereum')
const amount       = ref('')
const prices       = ref({})

// Load current USD prices from CoinGecko
onMounted(async () => {
  const ids = currencyOptions.map(c => c.value).join(',')
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    { params: { ids, vs_currencies: 'usd' } }
  )
  // flatten to { bitcoin: 12345, ethereum: 345, … }
  prices.value = Object.fromEntries(
    Object.entries(res.data).map(([k,v]) => [k, v.usd])
  )
})

// Labels for display
const fromLabel = computed(() => currencyOptions.find(c=>c.value===selectedFrom.value).label)
const toLabel   = computed(() => currencyOptions.find(c=>c.value===selectedTo.value).label)

// Compute converted amount
const convertedAmount = computed(() => {
  const a = parseFloat(amount.value)
  if (isNaN(a)) return '0.00'
  const pFrom = prices.value[selectedFrom.value]  || 0
  const pTo   = prices.value[selectedTo.value]    || 1
  return (a * pFrom / pTo).toFixed(6)
})

// Compute rate text
const rateText = computed(() => {
  const pFrom = prices.value[selectedFrom.value] || 0
  const pTo   = prices.value[selectedTo.value]   || 1
  if (!pFrom || !pTo) return ''
  const rate = (pFrom / pTo).toFixed(6)
  return `1 ${fromLabel.value} ≈ ${rate} ${toLabel.value}`
})

// Stub convert action
function convert() {
  console.log(`Convert ${amount.value} ${fromLabel.value} → ${convertedAmount.value} ${toLabel.value}`)
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
