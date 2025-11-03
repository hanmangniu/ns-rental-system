<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">租赁管理</h1>
          <p class="mt-2 text-gray-600">管理所有租赁订单和设备</p>
        </div>
        <NuxtLink
          to="/rentals/create"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          新建租赁
        </NuxtLink>
      </div>
    </div>

    <!-- 筛选条件 -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">筛选条件</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <!-- 订单编号 -->
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

          <!-- 所属店铺 -->
          <div>
            <label for="filterStore" class="block text-sm font-medium text-gray-700">
              所属店铺
            </label>
            <select
              id="filterStore"
              v-model="filters.storeId"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">全部</option>
              <option v-for="store in stores" :key="store.id" :value="store.id">
                {{ store.name }}
              </option>
            </select>
          </div>

          <!-- 设备类型 -->
          <div>
            <label for="filterDeviceType" class="block text-sm font-medium text-gray-700">
              设备类型
            </label>
            <select
              id="filterDeviceType"
              v-model="filters.deviceType"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">全部</option>
              <option v-for="type in deviceTypes" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>

          <!-- 租期时长 -->
          <div>
            <label for="filterDuration" class="block text-sm font-medium text-gray-700">
              租期时长
            </label>
            <select
              id="filterDuration"
              v-model="filters.rentalDuration"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">全部</option>
              <option v-for="duration in rentalDurations" :key="duration.id" :value="duration.id">
                {{ duration.name }}
              </option>
            </select>
          </div>

          <!-- 订单状态 -->
          <div>
            <label for="filterStatus" class="block text-sm font-medium text-gray-700">
              订单状态
            </label>
            <select
              id="filterStatus"
              v-model="filters.status"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">全部</option>
              <option v-for="status in orderStatusesOptions" :key="status.value" :value="status.value">
                {{ status.label }}
              </option>
            </select>
          </div>

          <!-- 起始日期 -->
          <div>
            <label for="filterStartDate" class="block text-sm font-medium text-gray-700">
              起始租期（起）
            </label>
            <input
              id="filterStartDate"
              v-model="filters.startDateFrom"
              type="date"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- 起始日期（止） -->
          <div>
            <label for="filterStartDateTo" class="block text-sm font-medium text-gray-700">
              起始租期（止）
            </label>
            <input
              id="filterStartDateTo"
              v-model="filters.startDateTo"
              type="date"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <!-- 操作按钮 -->
          <div class="flex items-end space-x-2">
            <button
              @click="handleSearch"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              查询
            </button>
            <button
              @click="handleReset"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              重置
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 z-20 bg-gray-50">
                订单编号
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                所属店铺
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                设备类型
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                设备容量
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                手柄数量
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                起始租期
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                租期时长
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最晚发货时间
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单状态
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 z-20 bg-gray-50">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium sticky left-0 z-10 bg-white">
                <NuxtLink
                  :to="`/rentals/${order.id}`"
                  class="text-indigo-600 hover:text-indigo-900 hover:underline"
                >
                  {{ order.orderNumber }}
                </NuxtLink>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getStoreName(order.storeId) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getDeviceTypeName(order.deviceType) }}
                <span v-if="order.deviceTypeOther" class="text-gray-400">({{ order.deviceTypeOther }})</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getDeviceCapacityName(order.deviceCapacity) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getControllerCountName(order.controllerCount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.startDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ getRentalDurationName(order.rentalDuration) }}
                <span v-if="order.rentalDurationOther" class="text-gray-400">({{ order.rentalDurationOther }})</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDateTime(order.latestShippingDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getOrderStatusClass(order.status)
                  ]"
                >
                  {{ getOrderStatusName(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sticky right-0 z-10 bg-white">
                <button
                  v-if="order.status === 1"
                  @click="handleShip(order)"
                  class="text-indigo-600 hover:text-indigo-900 hover:underline"
                >
                  去发货
                </button>
              </td>
            </tr>
            <tr v-if="paginatedOrders.length === 0">
              <td colspan="10" class="px-6 py-12 text-center text-sm text-gray-500">
                暂无数据
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            上一页
          </button>
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            下一页
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              显示
              <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              到
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredOrders.length) }}</span>
              条，共
              <span class="font-medium">{{ filteredOrders.length }}</span>
              条记录
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                上一页
              </button>
              <span
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer',
                  page === currentPage
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </span>
              <button
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
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
// 导入统一的选项数据
import {
  stores,
  deviceTypes,
  deviceCapacities,
  controllerCounts,
  rentalDurations,
  orderStatuses,
  getStoreName,
  getDeviceTypeName,
  getDeviceCapacityName,
  getControllerCountName,
  getRentalDurationName,
  getOrderStatusName,
  getOrderStatusClass,
} from "../../../utils/rentalOptions"

definePageMeta({
  layout: 'default'
})

// 转换为页面需要的格式
const orderStatusesOptions = orderStatuses.map(status => ({
  value: status.id,
  label: status.name,
}))

// 筛选条件
const filters = ref({
  orderNumber: '',
  storeId: '',
  deviceType: '',
  rentalDuration: '',
  status: '',
  startDateFrom: '',
  startDateTo: '',
})

// 模拟数据
const mockOrders = ref([
  {
    id: 1,
    orderNumber: 'R20250115001',
    storeId: 1,
    deviceType: 1,
    deviceTypeOther: '',
    deviceCapacity: 2,
    controllerCount: 2,
    preinstalledGames: '塞尔达传说：王国之泪\n马里奥赛车8',
    startDate: '2025-01-18',
    rentalDuration: 2,
    rentalDurationOther: '',
    latestShippingDate: '2025-01-17T10:30:00',
    status: 1,
    shippingAddress: '北京市朝阳区xxx街道xxx号',
    remarks: '',
  },
  {
    id: 2,
    orderNumber: 'R20250115002',
    storeId: 2,
    deviceType: 3,
    deviceTypeOther: '',
    deviceCapacity: 1,
    controllerCount: 1,
    preinstalledGames: '健身环大冒险',
    startDate: '2025-01-20',
    rentalDuration: 3,
    rentalDurationOther: '',
    latestShippingDate: '2025-01-19T14:00:00',
    status: 2,
    shippingAddress: '上海市浦东新区xxx路xxx号',
    remarks: '请小心包装',
  },
  {
    id: 3,
    orderNumber: 'R20250115003',
    storeId: 1,
    deviceType: 999,
    deviceTypeOther: 'PlayStation 5',
    deviceCapacity: 5,
    controllerCount: 2,
    preinstalledGames: '最终幻想16',
    startDate: '2025-01-25',
    rentalDuration: 999,
    rentalDurationOther: '45天',
    latestShippingDate: '2025-01-24T09:00:00',
    status: 999,
    shippingAddress: '广州市天河区xxx大道xxx号',
    remarks: '',
  },
])

// 过滤后的订单列表
const filteredOrders = computed(() => {
  let result = [...mockOrders.value]

  // 订单编号筛选
  if (filters.value.orderNumber) {
    result = result.filter(order => 
      order.orderNumber.toLowerCase().includes(filters.value.orderNumber.toLowerCase())
    )
  }

  // 店铺筛选
  if (filters.value.storeId) {
    result = result.filter(order => order.storeId === Number(filters.value.storeId))
  }

  // 设备类型筛选
  if (filters.value.deviceType) {
    result = result.filter(order => order.deviceType === Number(filters.value.deviceType))
  }

  // 租期时长筛选
  if (filters.value.rentalDuration) {
    result = result.filter(order => order.rentalDuration === Number(filters.value.rentalDuration))
  }

  // 订单状态筛选
  if (filters.value.status) {
    result = result.filter(order => order.status === filters.value.status)
  }

  // 起始日期范围筛选
  if (filters.value.startDateFrom) {
    result = result.filter(order => order.startDate >= filters.value.startDateFrom)
  }
  if (filters.value.startDateTo) {
    result = result.filter(order => order.startDate <= filters.value.startDateTo)
  }

  return result
})

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / pageSize.value)
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredOrders.value.slice(start, end)
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
    storeId: '',
    deviceType: '',
    rentalDuration: '',
    status: '',
    startDateFrom: '',
    startDateTo: '',
  }
  currentPage.value = 1
}

// 去发货
const handleShip = (order) => {
  navigateTo(`/rentals/ship/${order.id}`)
}

// 辅助方法已从 rentalOptions 导入

const formatDate = (date) => {
  if (!date) return '-'
  return date
}

const formatDateTime = (datetime) => {
  if (!datetime) return '-'
  const date = new Date(datetime)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 操作
const handleView = (order) => {
  console.log('查看订单:', order)
  // TODO: 跳转到详情页
}

const handleEdit = (order) => {
  console.log('编辑订单:', order)
  // TODO: 跳转到编辑页
  navigateTo(`/rentals/edit/${order.id}`)
}

const handleDelete = (order) => {
  if (confirm(`确定要删除订单 ${order.orderNumber} 吗？`)) {
    console.log('删除订单:', order)
    // TODO: 调用删除API
    const index = mockOrders.value.findIndex(o => o.id === order.id)
    if (index > -1) {
      mockOrders.value.splice(index, 1)
    }
  }
}
</script>
