// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // 假设你有这个页面

const router = createRouter({
  // 【关键配置】使用 Hash 模式
  // 含义：URL 会变成 http://localhost/#/home。
  // 这种模式不需要服务器配置，直接读取本地文件即可工作，最适合混合开发 App。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // 你可以在这里添加更多页面
  ]
})

export default router