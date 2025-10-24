<template>
  <div class="min-h-screen overflow-hidden bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- 左侧：Logo和菜单按钮 -->
          <div class="flex items-center">
            <button
              @click="toggleSidebar"
              class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <h1 class="text-xl font-semibold text-gray-900">租赁管理系统</h1>
            </div>
          </div>

          <!-- 右侧：用户信息和操作 -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="text-sm">
                <p class="text-gray-700 font-medium">{{ user?.name || user?.username }}</p>
                <p class="text-gray-500 text-xs">{{ user?.email }}</p>
              </div>
              <div class="relative">
                <button
                  @click="toggleUserMenu"
                  class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <div class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span class="text-white text-sm font-medium">
                      {{ (user?.name || user?.username || 'U').charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </button>
                
                <!-- 用户菜单下拉 -->
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">个人设置</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">帮助中心</a>
                  <div class="border-t border-gray-100"></div>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                    type="button"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex h-[calc(100vh-4rem-1px)]">
      <!-- 侧边栏 -->
      <div
        :class="[
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 lg:h-full lg:sticky lg:top-16',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">菜单</h2>
          <button
            @click="toggleSidebar"
            class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav class="mt-5 px-2 space-y-1">
          <NuxtLink
            to="/"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            仪表盘
          </NuxtLink>

          <NuxtLink
            to="/rentals"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            租赁管理
          </NuxtLink>

          <NuxtLink
            to="/customers"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            客户管理
          </NuxtLink>

          <NuxtLink
            to="/equipment"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            设备管理
          </NuxtLink>

          <NuxtLink
            to="/reports"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            报表统计
          </NuxtLink>

          <NuxtLink
            to="/settings"
            class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            <svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            系统设置
          </NuxtLink>
        </nav>
      </div>

      <!-- 遮罩层（移动端） -->
      <div
        v-if="sidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
      ></div>

      <!-- 主内容区域 -->
      <div class="flex-1 lg:ml-0 overflow-y-auto">
        <main class="flex-1 h-full">
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <slot />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
// 简化状态管理
const user = ref(null)
const isLoggedIn = ref(false)

const sidebarOpen = ref(false)
const showUserMenu = ref(false)

// 检查登录状态
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        user.value = JSON.parse(userData)
        isLoggedIn.value = true
      } catch (error) {
        console.error('解析用户数据失败:', error)
      }
    }
  }
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  console.log('开始登出...')
  
  // 清除本地存储
  if (process.client) {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
  }
  
  // 更新本地状态
  user.value = null
  isLoggedIn.value = false
  
  console.log('本地数据已清除，准备跳转')
  
  // 直接跳转到登录页
  window.location.href = '/login'
}


// 点击外部关闭用户菜单
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 登录状态检查
watch(isLoggedIn, (newValue) => {
  if (newValue === false) {
    navigateTo('/login')
  }
})
</script>
