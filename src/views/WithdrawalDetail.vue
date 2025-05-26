<template>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <!-- App Bar -->
      <v-app-bar dense flat color="primary" dark>
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>Withdrawal</v-toolbar-title>
      </v-app-bar>

      <!-- Coin Info & Balance -->
      <v-card flat class="mt-4 pa-4" dark color="#1e1e2f">
        <v-row align="center">
          <v-col cols="auto">
            <v-icon size="36">{{ info.icon }}</v-icon>
          </v-col>
          <v-col>
            <div class="subtitle-1 white--text">{{ info.name }}</div>
            <div class="caption grey--text">{{ info.symbol }}</div>
          </v-col>
          <v-spacer />
          <v-col cols="auto" class="text-right">
            <div class="caption grey--text">Available balance</div>
            <div class="subtitle-1 purple--text">0.00 {{ info.symbol }}</div>
          </v-col>
        </v-row>
      </v-card>

      <!-- Form Card -->
      <v-card class="mt-4 pa-4" dark color="#1e1e2f">
        <v-text-field
          v-model="amount"
          label="Withdrawal amount"
          type="number"
          outlined
          dense
          hide-details
          class="mb-4"
        >
          <template #append>
            <v-btn text small @click="setMax">Max</v-btn>
          </template>
        </v-text-field>

        <v-text-field
          v-model="address"
          label="Withdrawal address"
          outlined
          dense
          hide-details
          class="mb-4"
        />

        <v-text-field
          v-model="password"
          label="Fund password"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          hide-details
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="toggleShowPassword"
          class="mb-4"
        />

        <div class="caption grey--text mt-2">
          Important Notice: Please be aware that withdrawals will incur a handling fee of 2%. 
          The fee will be processed within 24 hours of your withdrawal request. If you have any 
          questions or require assistance, please contact our 
          <a href="#" class="purple--text text--underline">customer service team</a>.
          <br />Handling fees: <strong>0.1%</strong>
        </div>
      </v-card>

      <v-btn block large color="primary" class="mt-6" @click="confirmWithdrawal">
        Confirm withdrawal
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const assetMap = {
  btc:  { name: 'Bitcoin', symbol: 'BTC', icon: 'mdi-bitcoin' },
  eth:  { name: 'Ethereum', symbol: 'ETH', icon: 'mdi-ethereum' },
  usdt_erc: { name: 'Tether', symbol: 'USDT-ERC', icon: 'mdi-currency-usd' },
  usdt_trc: { name: 'TRON', symbol: 'USDT-TRC', icon: 'mdi-currency-usd' },
  usdc: { name: 'Circle', symbol: 'USDC', icon: 'mdi-currency-usd' },
}

const route = useRoute()
const key = route.params.asset?.toString().toLowerCase() || 'btc'
const info = computed(() => assetMap[key] || assetMap['btc'])

const amount = ref(null)
const address = ref('')
const password = ref('')
const showPassword = ref(false)

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function setMax() {
  amount.value = 0.00
}

function confirmWithdrawal() {
  console.log('Withdrawal:', key, amount.value, address.value)
}
</script>

<style scoped>
.caption {
  line-height: 1.4;
}
.white--text { color: #fff !important; }
</style>
