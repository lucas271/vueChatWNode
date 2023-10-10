import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { registerPlugins } from '@/plugins'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

registerPlugins(app)

app.mount('#app')
