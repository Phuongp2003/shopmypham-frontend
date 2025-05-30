import './assets/main.css';

import { createApp } from 'vue';
import uiPlugin from '@nuxt/ui/vue-plugin';
import { createPinia } from 'pinia';
import '@vueuse/core';

import router from './router';
import App from './App.vue';
import { initializeStores } from './common/init.store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// Initialize stores once after Pinia is set up
await initializeStores();
app.use(router);
app.use(uiPlugin);
app.mount('#app');
