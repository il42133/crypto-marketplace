<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Details</v-toolbar-title>
    </v-app-bar>

    <v-container class="pa-4" fluid>
      <!-- Header Card -->
      <v-card class="mb-6" dark color="#1e1e2f">
        <v-sheet class="pa-3" color="#2a2a3f" rounded="0">
          <v-icon left class="mr-2">mdi-currency-usd</v-icon>
          {{ prod.title }}
        </v-sheet>
        <v-row class="py-4 px-3" align="center">
          <v-col cols="4" class="text-left">
            <div class="text-h6 red--text font-weight-bold">
              {{ prod.rate }} %
            </div>
            <div class="caption">Average return</div>
          </v-col>
          <v-col cols="4" class="text-center">
            <div class="text-h6">{{ prod.days }}</div>
            <div class="caption">Project cycle (Days)</div>
          </v-col>
          <v-col cols="4" class="text-right">
            <div class="text-h6">{{ prod.min }} USDT</div>
            <div class="caption">Min investment</div>
          </v-col>
        </v-row>
      </v-card>

      <!-- Product Details -->
      <div class="text-h6 mb-2 white--text">Product details</div>
      <v-card class="mb-6 pa-4" dark color="#2a2a3f">
        <v-row dense>
          <v-col cols="6">Project name</v-col>
          <v-col cols="6" class="text-right">{{ prod.title }}</v-col>

          <v-col cols="6">Project progress</v-col>
          <v-col cols="6" class="text-right">{{ prod.progress }} %</v-col>

          <v-col cols="6">Total project amount</v-col>
          <v-col cols="6" class="text-right">{{ prod.totalAmount }} USDT</v-col>

          <v-col cols="6">Remaining amount</v-col>
          <v-col cols="6" class="text-right">{{ prod.remainingAmount }} USDT</v-col>

          <v-col cols="6">Number of restricted investments</v-col>
          <v-col cols="6" class="text-right">{{ prod.restricted }}</v-col>

          <v-col cols="6">Average daily return</v-col>
          <v-col cols="6" class="text-right red--text font-weight-bold">
            {{ prod.rate }} %
          </v-col>
        </v-row>
      </v-card>

      <!-- Fund Introduction -->
      <div class="text-h6 mb-2 white--text">Fund introduction</div>
      <v-card class="mb-6 pa-4" dark color="#2a2a3f">
        <div>
          The annualized income is fixed; interest accrues from the next day and is paid daily. Early redemption forfeits accrued interest, and principal returns within 72 hours.
        </div>
      </v-card>

      <!-- Product Rules -->
      <div class="text-h6 mb-2 white--text">Product rules</div>
      <v-card class="mb-6 pa-4" dark color="#2a2a3f">
        <div>Regular investment</div>
      </v-card>

      <!-- Buy Now -->
      <v-btn block large color="primary" @click="dialog = true">
        Buy Now
      </v-btn>

      <!-- Purchase Dialog -->
      <v-dialog v-model="dialog" max-width="400">
        <v-card dark color="#1e1e2f">
          <v-card-title class="headline">
            {{ prod.title }} Purchase
            <v-spacer />
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="amount"
              label="Enter amount (USDT)"
              type="number"
              :rules="[value => value >= prod.min || `Min ${prod.min} USDT`]"
              outlined
              dense
            />

            <v-row class="mt-4">
              <v-col cols="6">Min: {{ prod.min }} USDT</v-col>
              <v-col cols="6" class="text-right">Available: {{ prod.remainingAmount }} USDT</v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="confirmPurchase" :disabled="!validAmount">
              Confirm
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route  = useRoute()
const goBack = () => router.back()

// Dialog state and amount input
const dialog = ref(false)
const amount = ref(null)

// Map of product definitions
const productsMap = {
  plan1: { title: 'USDT Smart Contract', rate: 0.75, min: 500, days: 15, progress: 25, totalAmount: 1000000000, remainingAmount: 749991493, restricted: 3 },
  plan2: { title: 'USDT Smart Contract', rate: 3,    min: 10000, days: 30, progress: 24, totalAmount: 1000000000, remainingAmount: 760000000, restricted: 5 },
  plan3: { title: 'USDT Smart Contract', rate: 5,    min: 50000, days: 60, progress: 90, totalAmount: 1000000000, remainingAmount: 100000000, restricted: 'Unlimited', },
  plan4: { title: 'USDT Smart Contract', rate: 7,    min: 100000,days: 120,progress: 75, totalAmount: 750000000, remainingAmount: 35000000,  restricted: 'Unlimited', },
}

// Pick the right product or fall back to plan1
const prod = productsMap[route.params.id] || productsMap.plan1

// Validate entered amount
const validAmount = computed(() => {
  const val = parseFloat(amount.value)
  return !isNaN(val) && val >= prod.min && val <= prod.remainingAmount
})

// Purchase confirmation (stub)
const confirmPurchase = () => {
  console.log(`Purchasing ${amount.value} USDT of ${prod.title}`)
  dialog.value = false
}
</script>

<style scoped>
.fill-height { height: 100vh; }
.red--text   { color: #f44336 !important; }
.white--text { color: #fff !important; }
</style>
