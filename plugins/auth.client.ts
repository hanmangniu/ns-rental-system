export default defineNuxtPlugin(() => {
  const user = ref(null)
  const isLoggedIn = ref(false)

  // 检查本地存储的登录状态
  const checkAuthStatus = () => {
    if (process.client) {
      const token = localStorage.getItem('auth-token')
      const userData = localStorage.getItem('user')
      
      if (token && userData) {
        try {
          user.value = JSON.parse(userData)
          isLoggedIn.value = true
        } catch (error) {
          console.error('解析用户数据失败:', error)
          clearAuthData()
        }
      } else {
        clearAuthData()
      }
    }
  }

  // 初始化时检查一次
  if (process.client) {
    checkAuthStatus()
  }

  // 清除认证数据
  const clearAuthData = () => {
    if (process.client) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('user')
    }
    user.value = null
    isLoggedIn.value = false
  }

  // 验证token有效性
  const verifyToken = async () => {
    if (!isLoggedIn.value) return false

    try {
      const token = localStorage.getItem('auth-token')
      if (!token) {
        clearAuthData()
        return false
      }

      const response = await $fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return response.success
    } catch (error) {
      console.error('Token验证失败:', error)
      clearAuthData()
      return false
    }
  }

  // 提供手动验证方法
  const manualVerifyToken = async () => {
    if (!isLoggedIn.value) return false

    try {
      const token = localStorage.getItem('auth-token')
      if (!token) {
        clearAuthData()
        return false
      }

      const response = await $fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.success) {
        clearAuthData()
        return false
      }

      return true
    } catch (error) {
      console.error('Token验证失败:', error)
      clearAuthData()
      return false
    }
  }

  // 提供全局状态和方法
  return {
    provide: {
      user: readonly(user),
      isLoggedIn: readonly(isLoggedIn),
      clearAuthData,
      manualVerifyToken,
      checkAuthStatus
    }
  }
})

