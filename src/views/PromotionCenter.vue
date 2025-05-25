<template>
  <v-container fluid class="pa-0 d-flex flex-column fill-height">
    <!-- App Bar -->
    <v-app-bar color="primary" dark dense flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Promotion Center</v-toolbar-title>
      <v-spacer />
      <v-btn text>
        <v-icon left>mdi-information-outline</v-icon>
        Rule
      </v-btn>
    </v-app-bar>

    <!-- Body -->
    <v-container class="pa-4" fluid>
      <!-- My Referral Card -->
      <v-card class="mx-auto mb-6" max-width="400">
        <v-sheet color="secondary" dark class="pa-4">
          <v-icon left>mdi-account-multiple-plus</v-icon>
          My referral
        </v-sheet>
        <v-card-text class="pt-4 pb-6 text-center">
          <div class="subtitle-2">Commission amount</div>
          <div class="text-h4 font-weight-bold">0</div>
        </v-card-text>
      </v-card>

      <!-- Four stats cards -->
      <v-row dense>
        <v-col cols="6" md="3" v-for="(stat,i) in stats" :key="i">
          <v-card outlined class="pa-4 text-center">
            <v-icon size="28" class="mb-2">{{ stat.icon }}</v-icon>
            <div class="text-h5 font-weight-medium">{{ stat.value }}</div>
            <div class="caption">{{ stat.label }}</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Invite button -->
      <div class="flex-grow-1" />
      <v-btn
        block
        color="primary"
        large
        class="mt-6"
        @click="dialog = true"
      >
        Invite friends to earn coins together
      </v-btn>

    <!-- My Promotion Section -->
  <div class="promotion-section px-4 mt-8">
    <div class="text-h6 mb-4">My promotion</div>

    <!-- Just the tabs -->
    <v-tabs
      v-model="activeGenTab"
      background-color="primary"
      dark
      grow
    >
      <v-tab value="gen1">Generation 1</v-tab>
      <v-tab value="gen2">Generation 2</v-tab>
      <v-tab value="gen3">Generation 3</v-tab>
    </v-tabs>

    <!-- Conditionally render each table -->
    <div class="mt-4">
      <v-data-table
        v-if="activeGenTab === 'gen1'"
        :headers="promotionHeaders"
        :items="gen1Data"
        dense
        hide-default-footer
        class="elevation-1"
      />

      <v-data-table
        v-else-if="activeGenTab === 'gen2'"
        :headers="promotionHeaders"
        :items="gen2Data"
        dense
        hide-default-footer
        class="elevation-1"
      />

      <v-data-table
        v-else
        :headers="promotionHeaders"
        :items="gen3Data"
        dense
        hide-default-footer
        class="elevation-1"
      />
    </div>
  </div>


      <!-- Referral Code Dialog -->
      <v-dialog v-model="dialog" max-width="360">
        <v-card>
          <v-card-title class="headline wrap-title text-center">
            Invite friends to earn crypto together
          </v-card-title>

          <v-card-text>
            <v-text-field
              v-model="referralCode"
              label="Your referral code"
              readonly
              append-inner-icon="mdi-content-copy"
              @click:append-inner="copyReferralCode"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)
const referralCode = ref('ABC123DEF')

const activeGenTab = ref('gen1')

const promotionHeaders = [
  { title: 'User ID',           key: 'userId',           align: 'start' },
  { title: 'Rebate amount',     key: 'rebate',           align: 'end'   },
  { title: 'Registration time', key: 'registrationTime', align: 'end'   },
]

const gen1Data = ref([])
const gen2Data = ref([])
const gen3Data = ref([])

const stats = [
  { icon: 'mdi-sitemap', value: 0, label: 'Number of people in one generation' },
  { icon: 'mdi-chart-histogram', value: 0, label: 'Number of second-generation people' },
  { icon: 'mdi-handshake-outline',  value: 0, label: 'Number of Three Generations' },
  { icon: 'mdi-account-group-outline', value: 0, label: 'Total number of promoters' },
]

function getGenData(value) {
  return value === 'gen2'
    ? gen2Data.value
    : value === 'gen3'
    ? gen3Data.value
    : gen1Data.value
}

function goBack() {
  router.back()
}

function copyReferralCode() {
  navigator.clipboard.writeText(referralCode.value)
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.wrap-title {
    white-space: normal;
}
</style>
