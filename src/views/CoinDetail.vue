<template>
  <v-container class="pa-4">
    <!-- Home Button -->
    <v-btn text @click="goHome" class="mb-4">
      Home
    </v-btn>

    <h2 class="text-h6 mt-4 mb-4">{{ displayName }}</h2>

    <!-- Timeframe toggle -->
    <v-btn-toggle v-model="selected" mandatory class="mb-4">
      <v-btn value="24h">24h</v-btn>
      <v-btn value="7d">7d</v-btn>
      <v-btn value="30d">30d</v-btn>
    </v-btn-toggle>

    <!-- Chart container -->
    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- Loading indicator -->
    <v-alert v-if="!chartReady" type="info" dense>
      Loading chart…
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Chart from 'chart.js/auto'
import zoomPlugin from 'chartjs-plugin-zoom'
import 'chartjs-adapter-date-fns'

// Register zoom plugin
Chart.register(zoomPlugin)

const route = useRoute()
const router = useRouter()
const coinId = route.params.id

// Display name and readiness
const displayName = ref('')
const chartReady = ref(false)

// Timeframe selection
const selected = ref('24h')
const labelMap = {
  '24h': 'Past 24 Hours',
  '7d':  'Past 7 Days',
  '30d': 'Past 30 Days',
}

// Storage for datasets
const chartDataSets = { '24h': null, '7d': null, '30d': null }

// Chart.js instance and canvas
const canvasRef = ref(null)
let chartInstance = null

// Helper to build Chart.js data structure
function buildData(prices) {
  return {
    labels: prices.map(p => p[0]),
    datasets: [{
      label: 'USD',
      data: prices.map(p => p[1]),
      fill: false,
      borderColor: '#ffffff',
      borderWidth: 2,
      pointRadius: 0,
    }],
  }
}

// Fetch all required data in parallel
async function fetchAllData() {
  const infoRes = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  )
  displayName.value = infoRes.data.name

  const [r24h, r7d, r30d] = await Promise.all([
    axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      { params: { vs_currency: 'usd', days: 1 } }
    ),
    axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      { params: { vs_currency: 'usd', days: 7 } }
    ),
    axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      { params: { vs_currency: 'usd', days: 30 } }
    )
  ])

  chartDataSets['24h'] = buildData(r24h.data.prices)
  chartDataSets['7d']  = buildData(r7d.data.prices)
  chartDataSets['30d'] = buildData(r30d.data.prices)
}

// Render or update chart based on selection
function renderChart() {
  const data = chartDataSets[selected.value]
  const title = `${displayName.value} — ${labelMap[selected.value]}`

  // Determine time unit and tick limits
  const unit = selected.value === '24h' ? 'minute' : 'day'
  const maxTicks = selected.value === '24h' ? 8 : 10

  // Compute data bounds
  const times = data.labels
  const minTime = Math.min(...times)
  const maxTime = Math.max(...times)

  if (!chartInstance) {
    const ctx = canvasRef.value.getContext('2d')
    chartInstance = new Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: { unit },
            min: minTime,
            max: maxTime,
            ticks: {
              autoSkip: true,
              maxTicksLimit: maxTicks,
              color: '#ffffff',
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: false,
            grid: { color: 'rgba(200,200,200,0.5)', lineWidth: 1 },
            ticks: { color: '#ffffff' },
          }
        },
        plugins: {
          title: { display: true, text: title, color: '#fff' },
          zoom: {
            limits: { x: { min: minTime, max: maxTime } },
            pan: { enabled: true, mode: 'x' },
            zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' }
          }
        }
      }
    })
  } else {
    chartInstance.options.scales.x.time.unit = unit
    chartInstance.options.scales.x.min = minTime
    chartInstance.options.scales.x.max = maxTime
    chartInstance.options.scales.x.ticks.maxTicksLimit = maxTicks
    chartInstance.options.plugins.title.text = title
    // update zoom limits on each timeframe switch
    chartInstance.options.plugins.zoom.limits = { x: { min: minTime, max: maxTime } }
    // update data and redraw
    chartInstance.data = data
    chartInstance.update()
  }
  chartReady.value = true
}

// Lifecycle hooks
onMounted(async () => {
  await fetchAllData()
  renderChart()
  watch(selected, renderChart)
})

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy()
})

// Navigate home
function goHome() {
  router.push({ path: '/' })
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 800px;
}
@media(max-width: 600px) {
  .chart-container {
    height: 300px;
  }
}
</style>
