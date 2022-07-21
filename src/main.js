import { createApp } from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue3-apexcharts'
import './scss/style.scss'

const app = createApp(App)
app.use(VueApexCharts)
app.mount('#app')