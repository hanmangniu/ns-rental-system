<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">新建租赁订单</h1>
          <p class="mt-2 text-gray-600">创建新的设备租赁订单</p>
        </div>
        <NuxtLink
          to="/rentals"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回列表
        </NuxtLink>
      </div>
    </div>

    <!-- 表单 -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">基本信息</h3>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- 订单编号 -->
            <div>
              <label for="orderNumber" class="block text-sm font-medium text-gray-700">
                订单编号 <span class="text-red-500">*</span>
              </label>
              <input
                id="orderNumber"
                v-model="form.orderNumber"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="请输入订单编号"
              />
            </div>

            <!-- 所属店铺 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                所属店铺 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label v-for="store in stores" :key="store.id" class="flex items-center">
                  <input
                    v-model="form.storeId"
                    :value="store.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ store.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">收件信息</h3>
          
          <div>
            <label for="shippingAddress" class="block text-sm font-medium text-gray-700">
              收件信息 <span class="text-red-500">*</span>
            </label>
            <textarea
              id="shippingAddress"
              v-model="form.shippingAddress"
              required
              rows="3"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="请输入详细的收件地址、收件人姓名和联系电话"
            />
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">设备信息</h3>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- 设备类型 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                设备类型 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label v-for="type in deviceTypes" :key="type.id" class="flex items-center">
                  <input
                    v-model="form.deviceType"
                    :value="type.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ type.name }}</span>
                </label>
              </div>
            </div>

            <!-- 设备容量 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                设备容量 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label v-for="capacity in deviceCapacities" :key="capacity.id" class="flex items-center">
                  <input
                    v-model="form.deviceCapacity"
                    :value="capacity.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ capacity.name }}</span>
                </label>
              </div>
            </div>

            <!-- 手柄数量 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                手柄数量 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label v-for="controller in controllerCounts" :key="controller.id" class="flex items-center">
                  <input
                    v-model="form.controllerCount"
                    :value="controller.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ controller.name }}</span>
                </label>
              </div>
            </div>

            <!-- 预装游戏 -->
            <div>
              <label for="preinstalledGames" class="block text-sm font-medium text-gray-700">
                预装游戏 <span class="text-red-500">*</span>
              </label>
              <input
                id="preinstalledGames"
                v-model="form.preinstalledGames"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="请输入预装游戏名称"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">租期信息</h3>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <!-- 起始租期 -->
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700">
                起始租期 <span class="text-red-500">*</span>
              </label>
              <input
                id="startDate"
                v-model="form.startDate"
                type="date"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <!-- 租期时长 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                租期时长 <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label v-for="duration in rentalDurations" :key="duration.id" class="flex items-center">
                  <input
                    v-model="form.rentalDuration"
                    :value="duration.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ duration.name }}</span>
                </label>
              </div>
            </div>

            <!-- 最晚发货时间 -->
            <div>
              <label for="latestShippingDate" class="block text-sm font-medium text-gray-700">
                最晚发货时间 <span class="text-red-500">*</span>
              </label>
              <input
                id="latestShippingDate"
                v-model="form.latestShippingDate"
                type="date"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">其他信息</h3>
          
          <div>
            <label for="remarks" class="block text-sm font-medium text-gray-700">
              备注
            </label>
            <textarea
              id="remarks"
              v-model="form.remarks"
              rows="4"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="请输入备注信息（可选）"
            />
          </div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">提交失败</h3>
            <div class="mt-2 text-sm text-red-700">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="flex justify-end space-x-3">
        <NuxtLink
          to="/rentals"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          取消
        </NuxtLink>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSubmitting ? '提交中...' : '创建订单' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// 设置页面布局
definePageMeta({
  layout: 'default'
})

// 表单数据
const form = ref({
  orderNumber: '',
  storeId: '',
  shippingAddress: '',
  deviceType: '',
  deviceCapacity: '',
  controllerCount: '',
  preinstalledGames: '',
  startDate: '',
  rentalDuration: '',
  latestShippingDate: '',
  remarks: ''
})

// 选项数据
const stores = ref([
  { id: 'store1', name: '北京旗舰店' },
  { id: 'store2', name: '上海分店' },
  { id: 'store3', name: '广州分店' },
  { id: 'store4', name: '深圳分店' }
])

const deviceTypes = ref([
  { id: 'ps5', name: 'PlayStation 5' },
  { id: 'xbox', name: 'Xbox Series X' },
  { id: 'switch', name: 'Nintendo Switch' },
  { id: 'steam', name: 'Steam Deck' }
])

const deviceCapacities = ref([
  { id: '256gb', name: '256GB' },
  { id: '512gb', name: '512GB' },
  { id: '1tb', name: '1TB' },
  { id: '2tb', name: '2TB' }
])

const controllerCounts = ref([
  { id: '1', name: '1个手柄' },
  { id: '2', name: '2个手柄' },
  { id: '3', name: '3个手柄' },
  { id: '4', name: '4个手柄' }
])

const rentalDurations = ref([
  { id: '7', name: '7天' },
  { id: '14', name: '14天' },
  { id: '30', name: '30天' },
  { id: '60', name: '60天' },
  { id: '90', name: '90天' }
])

// 状态
const isSubmitting = ref(false)
const errorMessage = ref('')

// 生成订单编号
const generateOrderNumber = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `R${year}${month}${day}${random}`
}

// 初始化表单
onMounted(() => {
  form.value.orderNumber = generateOrderNumber()
  // 设置默认起始日期为今天
  form.value.startDate = new Date().toISOString().split('T')[0]
})

// 提交表单
const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // 这里可以调用API提交数据
    console.log('提交表单数据:', form.value)
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 提交成功后跳转到租赁列表
    await navigateTo('/rentals')
  } catch (error) {
    errorMessage.value = '提交失败，请重试'
    console.error('提交失败:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
