import './assets/main.css'

import { createApp } from 'vue'
import uiPlugin from '@nuxt/ui/vue-plugin'
import { createPinia } from 'pinia'
import '@vueuse/core'

import router from './router'
import App from './App.vue'
import setupAxios from './plugins/axios'
import { initializeStores } from './stores/init'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
// Initialize stores once after Pinia is set up
await initializeStores()
setupAxios()

app.use(router)
app.use(uiPlugin)
app.mount('#app')
