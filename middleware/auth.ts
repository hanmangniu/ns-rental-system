export default defineNuxtRouteMiddleware((to, from) => {
  // 跳过登录页面的检查
  if (to.path === '/login') {
    return
  }
  
  // 在客户端检查登录状态
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    const user = localStorage.getItem('user')
    
    // 如果没有token或用户信息，重定向到登录页
    if (!token || !user) {
      return navigateTo('/login')
    }
  }
})
