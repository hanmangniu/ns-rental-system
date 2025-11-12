// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // 允许通过局域网 IP 访问开发服务器
  devServer: {
    host: '0.0.0.0',
    https: true // 启用 HTTPS，摄像头 API 需要 HTTPS（localhost 除外）
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    public: {
      apiBase: '/api'
    }
  }
})
