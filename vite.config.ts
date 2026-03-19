import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  
  // 【关键配置 1】基础路径
  // 含义：Web 项目通常用 '/' (绝对路径)，但在手机 App 的文件系统中，
  // 必须使用 './' (相对路径)。如果不改，打包成 APK 后打开会白屏。
  base: './', 

  build: {
    // 【关键配置 2】输出目录
    // 含义：指定构建后的文件输出到哪里。Capacitor 默认会读取 'dist' 或 'www' 文件夹。
    outDir: 'dist',
    
    // 【关键配置 3】CSS 代码分割
    // 含义：设置为 false。在某些 Android 手机的 WebView 中，如果 CSS 被拆分成多个小文件，
    // 可能会导致样式加载闪烁或失效。合并成一个文件更稳妥。
    cssCodeSplit: false,
  },

  server: {
    // 【关键配置 4】局域网访问
    // 含义：设置为 true。这样你在电脑运行 npm run dev 时，
    // 可以用手机连接同一个 WiFi，通过电脑的 IP 地址在浏览器预览效果，方便调试。
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})