// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 引入 Pinia
import App from './App.vue'
import router from './router' // 引入刚才创建的路由
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // 使用 Pinia
app.use(router) // 使用 Router
app.use(ElementPlus, { locale: zhCn }) // 使用 Element Plus（中文）

app.mount('#app')
