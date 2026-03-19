// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 Pinia
import App from './App.vue'
import router from './router' // 引入刚才创建的路由

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // 使用 Pinia
app.use(router) // 使用 Router

app.mount('#app')