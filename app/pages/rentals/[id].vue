<template>
  <div>
    <!-- 面包屑 -->
    <nav class="mb-6 text-sm text-gray-500">
      <NuxtLink to="/rentals" class="hover:underline">租赁管理</NuxtLink>
      <span class="mx-2">/</span>
      <span>租赁详情</span>
    </nav>

    <!-- 标题 -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">租赁详情</h1>
        <p class="mt-1 text-gray-600">订单编号：{{ order?.orderNumber || '-' }}</p>
      </div>
      <div class="space-x-2">
        <NuxtLink
          to="/rentals"
          class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >返回列表</NuxtLink>
        <button
          v-if="order"
          @click="navigateTo(`/rentals/edit/${order.id}`)"
          class="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >编辑</button>
      </div>
    </div>

    <div v-if="!order" class="bg-white shadow rounded-lg p-8 text-center text-gray-500">
      未找到该订单
    </div>

    <div v-else class="space-y-6">
      <!-- 基本信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">基本信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <div class="text-gray-500">订单编号</div>
              <div class="mt-1 font-medium">{{ order.orderNumber }}</div>
            </div>
            <div>
              <div class="text-gray-500">所属店铺</div>
              <div class="mt-1 font-medium">{{ getStoreName(order.storeId) }}</div>
            </div>
            <div>
              <div class="text-gray-500">订单状态</div>
              <div class="mt-1">
                <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', getOrderStatusClass(order.status)]">
                  {{ getOrderStatusName(order.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收件信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">收件信息</h3>
          <div class="text-sm text-gray-700 whitespace-pre-line">{{ order.shippingAddress }}</div>
        </div>
      </div>

      <!-- 设备信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">设备信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <div class="text-gray-500">设备类型</div>
              <div class="mt-1 font-medium">
                {{ getDeviceTypeName(order.deviceType) }}
                <span v-if="order.deviceTypeOther" class="text-gray-400">（{{ order.deviceTypeOther }}）</span>
              </div>
            </div>
            <div>
              <div class="text-gray-500">设备容量</div>
              <div class="mt-1 font-medium">{{ getDeviceCapacityName(order.deviceCapacity) }}</div>
            </div>
            <div>
              <div class="text-gray-500">手柄数量</div>
              <div class="mt-1 font-medium">{{ getControllerCountName(order.controllerCount) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏/租期信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">游戏与租期</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <div class="text-gray-500">预装游戏</div>
              <div class="mt-1 whitespace-pre-line">{{ order.preinstalledGames }}</div>
            </div>
            <div>
              <div class="text-gray-500">起始租期</div>
              <div class="mt-1 font-medium">{{ order.startDate }}</div>
            </div>
            <div>
              <div class="text-gray-500">租期时长</div>
              <div class="mt-1 font-medium">
                {{ getRentalDurationName(order.rentalDuration) }}
                <span v-if="order.rentalDurationOther" class="text-gray-400">（{{ order.rentalDurationOther }}）</span>
              </div>
            </div>
            <div>
              <div class="text-gray-500">最晚发货时间</div>
              <div class="mt-1 font-medium">{{ formatDateTime(order.latestShippingDate) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 备注 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">备注</h3>
          <div class="text-sm text-gray-700 whitespace-pre-line">{{ order.remarks || '—' }}</div>
        </div>
      </div>

      <!-- 发货信息（若已发货） -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900">发货信息</h3>
            <NuxtLink
              v-if="order.status === 1"
              :to="`/rentals/ship/${orderId}`"
              class="text-indigo-600 hover:text-indigo-900 hover:underline"
            >去发货</NuxtLink>
          </div>
          <div v-if="order.shipping" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <div class="text-gray-500">快递平台</div>
                <div class="mt-1 font-medium">{{ getExpressVendorName(order.shipping.expressVendor) }}</div>
              </div>
              <div>
                <div class="text-gray-500">快递单号</div>
                <div class="mt-1 font-medium">{{ order.shipping.expressNo }}</div>
              </div>
              <div>
                <div class="text-gray-500">发货时间</div>
                <div class="mt-1 font-medium">{{ formatDateTime(order.shipping.shippedAt) }}</div>
              </div>
            </div>

            <div>
              <div class="text-gray-500 mb-2">发货图片</div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img
                  v-for="(url, i) in order.shipping.images"
                  :key="i"
                  :src="url"
                  class="w-full h-32 object-cover rounded border cursor-zoom-in"
                  @click="openPreview(url)"
                />
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-gray-500">暂无发货信息</div>
        </div>
      </div>

      <!-- 预览大图 Modal -->
      <div v-if="previewVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70" @click="closePreview">
        <img :src="previewImage" class="max-w-[90vw] max-h-[90vh] rounded shadow-lg" />
      </div>
    </div>
  </div>
  
</template>

<script setup>
// 统一选项与辅助方法
import {
  expressVendors,
  getStoreName,
  getDeviceTypeName,
  getDeviceCapacityName,
  getControllerCountName,
  getRentalDurationName,
  getOrderStatusName,
  getOrderStatusClass,
} from "../../../utils/rentalOptions"

definePageMeta({ layout: 'default' })

const route = useRoute()
const orderId = Number(route.params.id)

// 临时：与列表页一致的模拟数据
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
    shipping: null,
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
    shipping: {
      expressVendor: 1,
      expressNo: 'SF202501190001',
      images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
      shippedAt: '2025-01-19T14:00:00',
    },
  },
])

const order = computed(() => mockOrders.value.find(o => o.id === orderId))

onMounted(() => {
  const shipSaved = localStorage.getItem(`shipping-${orderId}`)
  if (shipSaved) {
    try {
      const saved = JSON.parse(shipSaved)
      const idx = mockOrders.value.findIndex(o => o.id === orderId)
      if (idx > -1) {
        mockOrders.value[idx] = {
          ...mockOrders.value[idx],
          status: 2,
          shipping: {
            expressVendor: saved.expressVendor,
            expressNo: saved.expressNo,
            images: Array.isArray(saved.images) ? saved.images : [],
            shippedAt: saved.shippedAt || mockOrders.value[idx].latestShippingDate,
          },
        }
      }
    } catch {}
  } else if (order.value && order.value.status === 2 && !order.value.shipping) {
    const idx = mockOrders.value.findIndex(o => o.id === orderId)
    if (idx > -1) {
      mockOrders.value[idx] = {
        ...mockOrders.value[idx],
        shipping: {
          expressVendor: 1,
          expressNo: 'SF202501190001',
          images: [],
          shippedAt: mockOrders.value[idx].latestShippingDate,
        },
      }
    }
  }

  // 合并本地编辑（非基本信息）
  const editSaved = localStorage.getItem(`order-edit-${orderId}`)
  if (editSaved) {
    try {
      const e = JSON.parse(editSaved)
      const idx = mockOrders.value.findIndex(o => o.id === orderId)
      if (idx > -1) {
        mockOrders.value[idx] = {
          ...mockOrders.value[idx],
          shippingAddress: e.shippingAddress,
          deviceType: e.deviceType,
          deviceTypeOther: e.deviceTypeOther,
          deviceCapacity: e.deviceCapacity,
          controllerCount: e.controllerCount,
          preinstalledGames: e.preinstalledGames,
          startDate: e.startDate,
          rentalDuration: e.rentalDuration,
          rentalDurationOther: e.rentalDurationOther,
          latestShippingDate: e.latestShippingDate,
          remarks: e.remarks,
        }
      }
    } catch {}
  }
})

const getExpressVendorName = (val) => {
  // 数字/字符串id映射为名称
  const idNum = Number(val)
  const found = expressVendors.find(v => v.id === idNum)
  return found ? found.name : (val || '-')
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

// 图片预览
const previewVisible = ref(false)
const previewImage = ref('')
const openPreview = (url) => {
  previewImage.value = url
  previewVisible.value = true
}
const closePreview = () => {
  previewVisible.value = false
  previewImage.value = ''
}
</script>


