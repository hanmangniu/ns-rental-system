<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">仪表盘</h1>
      <p class="mt-2 text-gray-600">欢迎使用租赁管理系统，这里是您的控制中心</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">总租赁数</dt>
                <dd class="text-lg font-medium text-gray-900">156</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">活跃客户</dt>
                <dd class="text-lg font-medium text-gray-900">89</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">设备总数</dt>
                <dd class="text-lg font-medium text-gray-900">234</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">本月收入</dt>
                <dd class="text-lg font-medium text-gray-900">¥45,678</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">快速操作</h3>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              @click="handleCreateRental"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
            >
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">新建租赁</p>
                <p class="text-sm text-gray-500">创建新的租赁订单</p>
              </div>
            </button>

            <NuxtLink
              to="/customers"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">客户管理</p>
                <p class="text-sm text-gray-500">查看和管理客户</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/equipment"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">设备管理</p>
                <p class="text-sm text-gray-500">管理租赁设备</p>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/reports"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">报表统计</p>
                <p class="text-sm text-gray-500">查看业务报表</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">最近活动</h3>
          <div class="flow-root">
            <ul class="-mb-8">
              <li>
                <div class="relative pb-8">
                  <div class="relative flex space-x-3">
                    <div>
                      <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">新租赁订单 <span class="font-medium text-gray-900">#R001</span> 已创建</p>
                      </div>
                      <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        2小时前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="relative pb-8">
                  <div class="relative flex space-x-3">
                    <div>
                      <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">客户 <span class="font-medium text-gray-900">张三</span> 完成注册</p>
                      </div>
                      <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        4小时前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="relative">
                  <div class="relative flex space-x-3">
                    <div>
                      <span class="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center ring-8 ring-white">
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                      </span>
                    </div>
                    <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p class="text-sm text-gray-500">设备 <span class="font-medium text-gray-900">#E001</span> 需要维护</p>
                      </div>
                      <div class="text-right text-sm whitespace-nowrap text-gray-500">
                        1天前
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 设置页面布局
definePageMeta({
  layout: 'default'
})

// 检查登录状态
const isLoggedIn = ref(false)

// 检查本地登录状态
onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      isLoggedIn.value = true
    } else {
      // 如果没有登录信息，跳转到登录页
      navigateTo('/login')
    }
  }
})

// 处理新建租赁点击
const router = useRouter()
const handleCreateRental = (e) => {
  if (e) e.preventDefault()
  console.log('点击新建租赁按钮 -> 跳转 /rentals/create')
  router.push('/rentals/create')
}
</script>
