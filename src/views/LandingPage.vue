<template>
  <div class="landing-wrapper">
    <!-- Side Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      width="280"
      app
    >
      <v-list dense>
        <!-- Top of drawer: either email or login/register -->
        <v-list-item>
            <v-list-item-title class="text-h6">
              <template v-if="authStore.user">
                {{ authStore.user.email }}
              </template>
              <template v-else>
                Welcome
              </template>
            </v-list-item-title>
            <v-list-item-subtitle v-if="!authStore.user">
              <v-btn text small @click="goLogin">Login</v-btn>
              <v-btn text small @click="goRegister">Register</v-btn>
            </v-list-item-subtitle>
        </v-list-item>

        <v-divider class="my-2"/>

        <!-- Menu items when logged in -->
        <template v-if="authStore.user">
          <v-list-item
            v-for="(item, i) in menuItems"
            :key="i"
            link
            @click="() => { drawer=false; if(item.route) router.push(item.route) }"
          >
            <template #prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            <template #append>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-list-item>
          <v-divider class="my-2"/>
          <v-list-item link @click="signOut">
            <template #prepend><v-icon>mdi-logout</v-icon></template>
              <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Top app bar -->
    <v-app-bar color="primary" dark dense flat>
      <!-- Toggle drawer on click -->
      <v-btn icon @click="drawer = true">
        <v-icon size="28">mdi-menu</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn icon>
        <v-icon size="28">mdi-message-text-outline</v-icon>
        <v-badge color="error" content=" " dot overlap />
      </v-btn>
    </v-app-bar>

    <!-- Page content -->
    <div class="landing-content">
      <!-- Centered Hero Carousel -->
      <div class="carousel-wrapper">
        <v-carousel
          hide-delimiters
          cycle
          :interval="5000"
          height="270"
          class="hero-carousel"
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(slide, i) in carouselImages"
            :key="i"
          >
            <img :src="slide" class="carousel-image" />
          </v-carousel-item>
        </v-carousel>
      </div>

      <!-- Call to action -->
      <v-card class="mx-4 my-2 call-to-action" elevation="2" shaped>
        <v-row align="center" justify="center" class="pa-4">
          <v-icon class="mr-2" size="28">mdi-bullhorn</v-icon>
          <span class="subtitle-1">Start your digital currency journey</span>
        </v-row>
      </v-card>

      <!-- Feature shortcuts -->
      <v-row class="mx-4" justify="space-around">
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary" @click="router.push({ name: 'Convert' })">
            <v-icon size="36">mdi-swap-horizontal</v-icon>
          </v-btn>
          <div class="caption mt-1">Convert</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary" @click="goToBitcoinDetail">
            <v-icon size="36">mdi-file-document-outline</v-icon>
          </v-btn>
          <div class="caption mt-1">Smart Contract</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary" @click="goToFinancing">
            <v-icon size="36">mdi-piggy-bank-outline</v-icon>
          </v-btn>
          <div class="caption mt-1">Financing</div>
        </v-col>
        <v-col cols="3" class="text-center">
          <v-btn icon large color="secondary" @click="router.push({ name: 'Loans' })">
            <v-icon size="36">mdi-bank-outline</v-icon>
          </v-btn>
          <div class="caption mt-1">Loan</div>
        </v-col>
      </v-row>

      <!-- Deposit / Withdrawal -->
      <v-row class="mx-4 mb-20" justify="space-around">
        <v-col cols="6">
          <v-card elevation="2" class="pa-4 d-flex align-center justify-space-between" clickable @click="router.push({ name: 'Deposit' })">
            <div class="d-flex align-center">
              <v-icon size="36">mdi-rocket-launch</v-icon>
              <span class="ml-4 subtitle-2">Deposit</span>
            </div>
            <v-icon>mdi-arrow-right</v-icon>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="pa-4 d-flex align-center justify-space-between" clickable @click="router.push({ name: 'Withdrawal' })">
            <div class="d-flex align-center">
              <v-icon size="36">mdi-cash-multiple</v-icon>
              <span class="ml-4 subtitle-2">Withdrawal</span>
            </div>
            <v-icon>mdi-arrow-right</v-icon>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Market Overview -->
    <v-container class="px-4 mb-8">
      <v-row align="center" justify="space-between" class="mb-4">
        <div class="text-h6">Market Overview</div>
        <v-btn text small @click="goToMarkets">More &gt;</v-btn>
      </v-row>

      <v-slide-group show-arrows class="market-slide-group">
        <v-slide-group-item
          v-for="market in marketData"
          :key="market.pair"
        >
          <v-card class="market-card" elevation="2">
            <div class="market-indicator"></div>
            <div class="text-subtitle2 mb-2">{{ market.pair }}</div>
            <div class="text-h5 font-weight-medium">{{ market.rate.toFixed(5) }}</div>
            <div :class="market.change >= 0 ? 'text-success' : 'text-error'" class="mb-3">
              {{ market.change.toFixed(2) }}%
            </div>
            <div class="flag-group mb-4">
              <v-avatar
                v-for="(flag, idx) in market.flags"
                :key="idx"
                size="24"
                class="flag-avatar"
              >
                <img :src="flag" />
              </v-avatar>
            </div>
            <v-btn color="primary" block small @click="() => onViewMore(market)">
              View More
            </v-btn>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-container>

    <!-- Tabs (separate & centered) -->
    <div class="section-wrapper">
      <v-tabs
        v-model="activeTab2"
        background-color="primary"
        dark
        grow
        class="justify-center"
      >
        <v-tab value="table">Markets</v-tab>
        <v-tab value="foreign">Foreign Currency</v-tab>
        <v-tab value="gold">International Gold</v-tab>
      </v-tabs>

    <!-- Tab Content -->
      <v-data-table
        v-if="activeTab2 === 'table'"
        :headers="miniHeaders"
        :items="cryptos"
        dense
        hide-default-footer
        hide-default-header
        :items-per-page="cryptos.length"
        class="elevation-1"
        @click:row="row => goToDetail(row.item.id)"
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
      <v-data-table
        v-if="activeTab2 === 'foreign'"
        :headers="foreignHeaders"
        :items="foreignRates"
        dense
        hide-default-footer
        hide-default-header
        :items-per-page="foreignRates.length"
        class="elevation-1"
      >
        <template #item.rate="{ item }">
        {{ item.rate }}
        </template>
        <template #item.change="{ item }">
        {{ item.change.toFixed(2) }}%
        </template>
      </v-data-table>
      <v-data-table
        v-if="activeTab2 === 'gold'"
        :headers="goldHeaders"
        :items="goldRates"
        dense
        hide-default-footer
        hide-default-header
        :items-per-page="goldRates.length"
        class="elevation-1"
      >
        <template #item.rate="{ item }">
        {{ item.rate }}
        </template>
        <template #item.change="{ item }">
        {{ item.change.toFixed(2) }}%
        </template>
      </v-data-table>
    </div>

    <!-- Bottom navigation (fixed) -->
    <v-bottom-navigation
      v-model="activeTab"
      color="primary"
      grow
      style="position: fixed; bottom: 0; left: 0; right: 0;"
    >
      <v-btn value="home" @click="() => router.push({ path: '/' })">
        <v-icon size="20">mdi-home</v-icon>
        Home
      </v-btn>
      <v-btn value="markets" @click="() => router.push({ path: '/markets' })">
        <v-icon size="20">mdi-chart-line</v-icon>
        Markets
      </v-btn>
      <v-btn value="trade" @click="() => router.push({ name: 'coinDetail', params: { id: 'bitcoin' } })">
        <v-icon size="20">mdi-swap-horizontal</v-icon>
        Trade
      </v-btn>
      <v-btn value="pledge" @click="() => router.push({ name: 'Pledge' })">
        <v-icon size="20">mdi-pickaxe</v-icon>
        Pledge
      </v-btn>
      <v-btn value="assets" @click="() => router.push({ path: '/assets' })">
        <v-icon size="20">mdi-wallet</v-icon>
        Assets
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { signOut as fbSignOut } from '../firebase.js'
import { auth } from '../firebase.js'
import slide1 from '../assets/cdex4eb2bcf63c574e1893a672f270a431b7.jpg'
import slide2 from '../assets/cdex20ee20f0683c4f468c3054ef38abdd22.jpg'
import euFlag  from '../assets/flags/eu.png'
import usFlag  from '../assets/flags/us.png'
import gbFlag  from '../assets/flags/gb.png'
import xau from '../assets/flags/xau.png'
import xag from '../assets/flags/xag.png'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase.js'

// Router & state
const router = useRouter()
const authStore = useAuthStore()
const drawer = ref(false)
const activeTab = ref('home')     // bottom nav
const activeTab2 = ref('table')    // market tabs

// menu definitions
const menuItems = [
  { title: 'Primary Verification', icon: 'mdi-shield-check', route: '/primary-verification' },
  { title: 'Identify Verification', icon: 'mdi-card-account-details' },
  { title: 'Set Fund password', icon: 'mdi-lock-reset', route: '/set-fund-password' },
  { title: 'Set login password', icon: 'mdi-lock', route: '/set-login-password' },
  { title: 'sidebar_bind_address', icon: 'mdi-map-marker-radius' },
  { title: 'sidebar_plug', icon: 'mdi-flash', route: '/promotion' },
  { title: 'Email Authentication', icon: 'mdi-email', route: '/email-authentication' },
  { title: 'Terms of Service', icon: 'mdi-file-document-outline' },
  { title: 'Help Center', icon: 'mdi-help-circle-outline' },
  { title: 'English', icon: 'mdi-translate' },
  { title: 'sidebar_home_service', icon: 'mdi-home-city-outline' },
  { title: 'sidebar_message', icon: 'mdi-message-outline' },
]

// navigation helpers
function goLogin()    { router.push({ path: '/login' }) }
function goRegister() { router.push({ path: '/register' }) }
function signOut() {
  fbSignOut(auth).then(() => {
    authStore.clearUser()
    drawer.value = false
    router.push({ path: '/' })
  })
}

// Carousel
const carouselImages = [slide1, slide2]

// Mini table
const cryptos = ref([])
const miniHeaders = [
  { title: 'Currency', key: 'name',  align: 'start' },
  { title: 'Price',    key: 'price', align: 'end'   },
  { title: '24h %',    key: 'change',align: 'end'   },
]
const foreignRates = ref([
  { pair: 'EURUSD', rate: 1.04013, change: 0 },
  { pair: 'GBPUSD', rate: 1.22942, change: 0 },
])
const foreignHeaders = [
  { title: 'Pair',  key: 'pair', align: 'start' },
  { title: 'Value', key: 'rate', align: 'end'   },
  { title: 'Change',key: 'change',align: 'end'   },
]
const goldRates = ref([
  { pair: 'XAU/USD', rate: 2709.55,  change: 0 },
  { pair: 'XAG/USD', rate: 30.5004,  change: 0 },
])
const goldHeaders = [
  { title: 'Pair',   key: 'pair',  align: 'start' },
  { title: 'Value',  key: 'rate',  align: 'end'   },
  { title: 'Change', key: 'change',align: 'end'   },
]
// Market Overview cards
const marketData = ref([
  { pair: 'EURUSD', rate: 1.04013, change: -0.00, flags: [euFlag, usFlag] },
  { pair: 'GBPUSD', rate: 1.22942, change: -0.00, flags: [gbFlag, usFlag] },
  { pair: 'XAU/USD', rate: 2709.55, change: -0.00, flags: [xau] },
  { pair: 'XAG/USD', rate: 30.5004, change: -0.00, flags: [xag] }
])

// Navigation helpers
function goToMarkets()        { router.push({ path: '/markets' }) }
function onViewMore(market)   { console.log('View more for', market.pair) }
function goToDetail(id)       { router.push({ name: 'coinDetail', params: { id } }) }

// Firestore subscription
let unsub
onMounted(() => {
  const q = query(collection(db, 'coinPrices'), orderBy('price', 'desc'))
  unsub = onSnapshot(q, snap => {
    cryptos.value = snap.docs.map(d => {
      const r = d.data()
      return { id: d.id, name: r.name, price: r.price, change: r.change || 0 }
    })
  })
})
onUnmounted(() => { if (unsub) unsub() })

// Formatters
function formatPrice(v) {
  return `$${v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

function goToBitcoinDetail() {
  router.push({ name:'coinDetail', params: { id: 'bitcoin' }})
}

function goToFinancing() {
  router.push({ name: 'Financing' })
}
</script>

<style scoped>
.landing-wrapper {
  position: relative;
  padding-bottom: 64px;
  overflow-x: hidden;
}
.carousel-wrapper {
  display: flex;
  justify-content: center;
  margin: 8px 0;
  overflow: hidden;
}
.hero-carousel {
  width: 500px;
  max-width: 90vw;
}
.carousel-image {
  display: block;
  width: 100%;
  height: auto;
}
.call-to-action {
  min-height: 50px;
  display: flex;
  align-items: center;
}
/* Market Overview */
.market-slide-group { padding-left: 0; }
.market-card {
  width: 180px; min-width: 180px;
  background-color: #1e1e2f; border-radius: 12px;
  padding: 16px; margin-right: 16px; color: #fff;
  display: flex; flex-direction: column; align-items: center;
}
.market-indicator {
  width: 24px; height: 4px; background-color: #ffc107;
  border-radius: 2px; margin-bottom: 12px;
}
.flag-group   { display: flex; }
.flag-avatar  { border: 2px solid #1e1e2f; margin-left: -8px; }
.flag-avatar img {
  width: 100%; height: 100%; object-fit: cover;
}
.v-slide-group__prev, .v-slide-group__next { color: #fff; }

.section-wrapper {
    max-width: 98%;
    margin: 0 auto;
    padding: 0 16px;
}

</style>
