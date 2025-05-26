<template>
  <v-container fluid class="pa-4">
    <!-- App Bar -->
    <v-app-bar dense flat color="primary" dark>
      <v-btn icon @click="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Assistance Loan</v-toolbar-title>
    </v-app-bar>

    <!-- Step Indicator -->
    <v-stepper v-model="step" flat>
      <v-stepper-header>
        <v-stepper-step :complete="step>1" step="1">Fill in Application</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step>2" step="2">Upload Data</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Application Result</v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <v-form ref="form" class="mt-6">
      <!-- Loan Range -->
      <v-select
        v-model="selectedRange"
        :items="loanOptions"
        item-title="label"
        item-value="value"
        label="Loan Range"
        outlined
        dense
      />

      <!-- Loan Amount -->
      <v-text-field
        v-model.number="loanAmount"
        label="Loan Amount (USDT)"
        type="number"
        outlined
        dense
        class="mt-4"
      />

      <!-- Repayment Cycle & Daily Interest -->
      <v-row class="mt-4">
        <v-col cols="6">
          <v-text-field
            v-model="repaymentCycle"
            label="Repayment Cycle (Days)"
            readonly
            outlined
            dense
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="dailyInterest"
            label="Daily Interest Rate (%)"
            readonly
            outlined
            dense
          />
        </v-col>
      </v-row>

      <!-- Interest Calculation -->
      <v-card class="pa-4 mt-4" dark color="#1e1e2f">
        <v-row>
          <v-col cols="6">Interest</v-col>
          <v-col cols="6" class="text-right">
            {{ calculatedInterest.toFixed(2) }} USDT
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Repayment Method</v-col>
          <v-col cols="6" class="text-right">Repay principal and interest once upon expiration</v-col>
        </v-row>
        <v-row>
          <v-col cols="6">Lending Institutions</v-col>
          <v-col cols="6" class="text-right">Binance</v-col>
        </v-row>
      </v-card>

      <!-- Debit and Credit Record -->
      <v-btn block outlined class="mt-4" color="green darken-1">
        <v-icon left>mdi-clock-outline</v-icon>
        Debit and Credit Record
        <v-spacer></v-spacer>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <!-- Next Step -->
      <v-btn block large color="primary" class="mt-6" @click="goNext">
        Next Step
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const step = ref(1)
const selectedRange = ref(null)
const loanAmount = ref(null)
const repaymentCycle = ref('')
const dailyInterest = ref('')

// Define loan ranges; you can edit these values
const loanOptions = [
  { label: '100 - 10,000', value: 'range1', cycle: 7, rate: 0.16 },
  { label: '1,000 - 1,000,000', value: 'range2', cycle: 15, rate: 0.142 },
  { label: '1,000 - 2,000,000', value: 'range3', cycle: 30, rate: 0.133 },
  { label: '1,000 - 1,000,000', value: 'range4', cycle: 30, rate: 0.05 }
]

// Update cycle and rate when range changes
watch(selectedRange, (val) => {
  const option = loanOptions.find(o => o.value === val)
  repaymentCycle.value = option?.cycle || ''
  dailyInterest.value = option?.rate || ''
})

// Calculate interest: amount * rate% * days
const calculatedInterest = computed(() => {
  if (!loanAmount.value || !dailyInterest.value || !repaymentCycle.value) return 0
  return loanAmount.value * (dailyInterest.value / 100) * repaymentCycle.value
})

function goNext() {
  // Advance stepper or navigate
  if (step.value < 3) step.value++
  else router.push({ name: 'ApplicationResult' })
}
</script>

<style scoped>
.white--text { color: #fff !important; }
</style>
