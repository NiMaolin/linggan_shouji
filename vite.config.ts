import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  
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
    port: 5173, // 固定端口号，方便手机访问
    hmr: {
      // 【关键配置 5】HMR 热更新配置
      // 真机调试时，需要指定 WebSocket 的连接地址
      protocol: 'ws',
      port: 5173,
      host: '0.0.0.0', // 监听所有网络接口，允许手机连接
    },
    watch: {
      // 【关键配置 6】监听配置
      // 确保文件变化时能够触发重新编译
      usePolling: false, // Windows 通常不需要轮询
      interval: 100, // 轮询间隔（仅在 usePolling=true 时有效）
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})