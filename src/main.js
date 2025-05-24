// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import '../mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ 
  components, 
  directives,
  theme: {
    defaultTheme: 'customDark',
    themes: {
      customDark: {
        dark: true,
        colors: {
          background: '#0f0236',  // page background
          surface:    '#21036b',  // cards, tables, etc.
          primary:    '#ffffff',  // main text & icons
          onSurface: '#ffffff',   // ensure text on surfaces is white
        },
      },
    },
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
