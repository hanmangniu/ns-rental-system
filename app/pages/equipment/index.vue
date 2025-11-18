<template>
  <div>
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">设备管理</h1>
          <p class="mt-2 text-gray-600">管理所有租赁设备和库存</p>
        </div>
        <button
          type="button"
          @click="loadDevices"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          刷新
        </button>
      </div>
    </div>

    <!-- 筛选条件 -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">筛选条件</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label for="filterOrderNumber" class="block text-sm font-medium text-gray-700">
              订单编号
            </label>
            <input
              id="filterOrderNumber"
              v-model="filters.orderNumber"
              type="text"
              placeholder="请输入订单编号"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              @keyup.enter="handleSearch"
            />
          </div>
          <div>
            <label for="filterConsoleSerial" class="block text-sm font-medium text-gray-700">
              主机序列号
            </label>
            <input
              id="filterConsoleSerial"
              v-model="filters.consoleSerial"
              type="text"
              placeholder="请输入主机序列号"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              @keyup.enter="handleSearch"
            />
          </div>
          <div class="flex items-end">
            <button
              type="button"
              @click="handleSearch"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 mr-2"
            >
              查询
            </button>
            <button
              type="button"
              @click="handleReset"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              重置
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 设备列表 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                主机序列号
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                主机内置充电电池
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joy-Con (L)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joy-Con (R)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                当前订单号
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="filteredDevices.length === 0" class="hover:bg-gray-50">
              <td colspan="5" class="px-6 py-8 text-center text-sm text-gray-500">
                暂无设备信息
              </td>
            </tr>
            <tr v-for="device in paginatedDevices" :key="device.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ device.consoleSerial || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ device.batterySerial || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ device.joyconLeft || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ device.joyconRight || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <NuxtLink
                  v-if="device.orderNumber"
                  :to="`/rentals/${device.orderId}`"
                  class="text-indigo-600 hover:text-indigo-900 hover:underline"
                >
                  {{ device.orderNumber }}
                </NuxtLink>
                <span v-else class="text-gray-400">-</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              到 <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredDevices.length) }}</span>
              条，共 <span class="font-medium">{{ filteredDevices.length }}</span> 条
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="page !== '...' && (currentPage = page)"
                :disabled="page === '...'"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium disabled:cursor-default'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// 筛选条件
const filters = ref({
  orderNumber: '',
  consoleSerial: '',
})

// 设备列表
const devices = ref([])

// 从 localStorage 加载设备数据
const loadDevices = () => {
  const deviceList = []
  
  // 遍历 localStorage 查找所有发货信息
  if (process.client) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('shipping-')) {
        const orderId = key.replace('shipping-', '')
        try {
          const shippingData = JSON.parse(localStorage.getItem(key))
          
          // 获取订单号
          let orderNumber = ''
          const orderKey = `order-${orderId}`
          const orderEditKey = `order-edit-${orderId}`
          
          if (localStorage.getItem(orderKey)) {
            try {
              const orderData = JSON.parse(localStorage.getItem(orderKey))
              orderNumber = orderData.orderNumber || ''
            } catch {}
          }
          
          if (!orderNumber && localStorage.getItem(orderEditKey)) {
            try {
              const orderData = JSON.parse(localStorage.getItem(orderEditKey))
              orderNumber = orderData.orderNumber || ''
            } catch {}
          }
          
          // 只添加有设备信息的记录
          if (shippingData.consoleSerial || shippingData.batterySerial || 
              shippingData.joyconLeft || shippingData.joyconRight) {
            deviceList.push({
              id: orderId,
              orderId: Number(orderId),
              orderNumber: orderNumber,
              consoleSerial: shippingData.consoleSerial || '',
              batterySerial: shippingData.batterySerial || '',
              joyconLeft: shippingData.joyconLeft || '',
              joyconRight: shippingData.joyconRight || '',
            })
          }
        } catch (err) {
          console.error('解析发货信息失败:', key, err)
        }
      }
    }
  }
  
  devices.value = deviceList
}

// 过滤后的设备列表
const filteredDevices = computed(() => {
  let result = [...devices.value]
  
  // 订单编号筛选
  if (filters.value.orderNumber) {
    result = result.filter(device => 
      device.orderNumber && device.orderNumber.toLowerCase().includes(filters.value.orderNumber.toLowerCase())
    )
  }
  
  // 主机序列号筛选
  if (filters.value.consoleSerial) {
    result = result.filter(device => 
      device.consoleSerial && device.consoleSerial.toLowerCase().includes(filters.value.consoleSerial.toLowerCase())
    )
  }
  
  return result
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

const totalPages = computed(() => {
  return Math.ceil(filteredDevices.value.length / pageSize.value)
})

const paginatedDevices = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredDevices.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// 查询
const handleSearch = () => {
  currentPage.value = 1
}

// 重置
const handleReset = () => {
  filters.value = {
    orderNumber: '',
    consoleSerial: '',
  }
  currentPage.value = 1
}

// 初始化加载数据
onMounted(() => {
  loadDevices()
  
  // 监听 localStorage 变化（当有新发货信息时刷新）
  if (process.client) {
    window.addEventListener('storage', () => {
      loadDevices()
    })
  }
})
</script>


