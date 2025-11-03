<template>
  <div>
    <!-- 面包屑 -->
    <nav class="mb-6 text-sm text-gray-500">
      <NuxtLink to="/rentals" class="hover:underline">租赁管理</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink :to="`/rentals/${orderId}`" class="hover:underline">租赁详情</NuxtLink>
      <span class="mx-2">/</span>
      <span>编辑</span>
    </nav>

    <!-- 标题 -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">编辑租赁订单</h1>
        <p class="mt-1 text-gray-600">订单编号：{{ form.orderNumber || '-' }}</p>
      </div>
      <div class="space-x-2">
        <NuxtLink
          :to="`/rentals/${orderId}`"
          class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >返回详情</NuxtLink>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- 基本信息（只读） -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">基本信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <div class="text-gray-500">订单编号</div>
              <div class="mt-1 font-medium">{{ form.orderNumber }}</div>
            </div>
            <div>
              <div class="text-gray-500">所属店铺</div>
              <div class="mt-1 font-medium">{{ getStoreName(form.storeId) }}</div>
            </div>
            <div>
              <div class="text-gray-500">订单状态</div>
              <div class="mt-1">
                <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', getOrderStatusClass(form.status)]">
                  {{ getOrderStatusName(form.status) }}
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
          <textarea
            v-model="form.shippingAddress"
            rows="3"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="请输入详细的收件地址、收件人姓名和联系电话"
          />
        </div>
      </div>

      <!-- 设备信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">设备信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">设备类型 <span class="text-red-500">*</span></label>
              <div class="space-y-2">
                <label v-for="t in deviceTypes" :key="t.id" class="flex items-center">
                  <input v-model="form.deviceType" :value="t.id" type="radio" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span class="ml-2 text-sm text-gray-700">{{ t.name }}</span>
                </label>
              </div>
              <div v-if="isOtherOption(form.deviceType)" class="mt-2">
                <input v-model="form.deviceTypeOther" type="text" placeholder="请输入其他设备类型" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">设备容量 <span class="text-red-500">*</span></label>
              <div class="space-y-2">
                <label v-for="c in deviceCapacities" :key="c.id" class="flex items-center">
                  <input v-model="form.deviceCapacity" :value="c.id" type="radio" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span class="ml-2 text-sm text-gray-700">{{ c.name }}</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">手柄数量 <span class="text-red-500">*</span></label>
              <div class="space-y-2">
                <label v-for="cc in controllerCounts" :key="cc.id" class="flex items-center">
                  <input v-model="form.controllerCount" :value="cc.id" type="radio" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span class="ml-2 text-sm text-gray-700">{{ cc.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏/租期信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">游戏与租期</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">预装游戏 <span class="text-red-500">*</span></label>
              <textarea v-model="form.preinstalledGames" rows="3" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="请输入预装游戏" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">起始租期 <span class="text-red-500">*</span></label>
              <input v-model="form.startDate" type="date" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">租期时长 <span class="text-red-500">*</span></label>
              <div class="space-y-2">
                <label v-for="d in rentalDurations" :key="d.id" class="flex items-center">
                  <input v-model="form.rentalDuration" :value="d.id" type="radio" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span class="ml-2 text-sm text-gray-700">{{ d.name }}</span>
                </label>
              </div>
              <div v-if="isOtherOption(form.rentalDuration)" class="mt-2">
                <input v-model="form.rentalDurationOther" type="text" placeholder="请输入其他租期时长（如：45天）" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">最晚发货时间 <span class="text-red-500">*</span></label>
              <input v-model="form.latestShippingDate" type="datetime-local" step="1" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 备注 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">备注</h3>
          <textarea v-model="form.remarks" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="请输入备注（可选）" />
        </div>
      </div>

      <!-- 发货信息（仅状态为已发货时可编辑） -->
      <div v-if="form.status === 2" class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">发货信息</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">快递平台 <span class="text-red-500">*</span></label>
              <div class="mt-2 space-y-2">
                <label v-for="v in expressVendors" :key="v.id" class="flex items-center">
                  <input v-model="shipping.expressVendor" :value="v.id" type="radio" required class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                  <span class="ml-2 text-sm text-gray-700">{{ v.name }}</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">快递单号 <span class="text-red-500">*</span></label>
              <input v-model="shipping.expressNo" type="text" required placeholder="请输入快递单号" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">发货图片</label>
            <div
              class="mb-4 border-2 border-dashed rounded-md p-6 text-center"
              :class="dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'"
              @dragover.prevent="dragOver = true"
              @dragleave.prevent="dragOver = false"
              @drop.prevent="onDrop"
            >
              <p class="text-sm text-gray-600 mb-2">拖拽图片到此处上传，或</p>
              <label for="edit-upload" class="cursor-pointer text-indigo-600 hover:text-indigo-800 hover:underline">点击选择文件</label>
              <input id="edit-upload" type="file" multiple accept="image/*" class="hidden" @change="onShippingFilesChange" />
            </div>
            <div v-if="shippingPreviews.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="(url, i) in shippingPreviews" :key="url" class="relative group">
                <img :src="url" class="w-full h-32 object-cover rounded border cursor-zoom-in" @click="openPreview(url)" />
                <button type="button" @click="removeShippingImage(i)" class="absolute top-1 right-1 hidden group-hover:inline-flex bg-red-600 text-white text-xs px-2 py-0.5 rounded">删除</button>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500">支持多张图片</p>
          </div>
        </div>
      </div>

      <!-- 预览大图 Modal -->
      <div v-if="previewVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70" @click="closePreview">
        <img :src="previewImage" class="max-w-[90vw] max-h-[90vh] rounded shadow-lg" />
      </div>


      <!-- 操作按钮 -->
      <div class="flex justify-end space-x-2">
        <NuxtLink :to="`/rentals/${orderId}`" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          取消
        </NuxtLink>
        <button type="submit" :disabled="submitting" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
          <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ submitting ? '保存中...' : '保存' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {
  stores,
  deviceTypes,
  deviceCapacities,
  controllerCounts,
  rentalDurations,
  getStoreName,
  getOrderStatusName,
  getOrderStatusClass,
  isOtherOption,
} from "../../../../utils/rentalOptions"
import { expressVendors } from "../../../../utils/rentalOptions"

definePageMeta({ layout: 'default' })

const route = useRoute()
const orderId = Number(route.params.id)

const submitting = ref(false)

// 加载基础数据（与详情一致的mock）
const baseOrder = ref({
  id: orderId,
  orderNumber: '',
  storeId: 1,
  status: 2,
  shippingAddress: '',
  deviceType: 1,
  deviceTypeOther: '',
  deviceCapacity: 2,
  controllerCount: 1,
  preinstalledGames: '',
  startDate: '',
  rentalDuration: 2,
  rentalDurationOther: '',
  latestShippingDate: '',
  remarks: '',
})

// 尝试从详情页的mock拼数据（仅展示效果，真实项目应调用API）
onMounted(() => {
  // 从详情页local覆盖读取已发货信息
  const savedOrder = localStorage.getItem(`order-${orderId}`)
  if (savedOrder) {
    try {
      const o = JSON.parse(savedOrder)
      Object.assign(baseOrder.value, o)
    } catch {}
  }
  // 从编辑缓存读取
  const editSaved = localStorage.getItem(`order-edit-${orderId}`)
  if (editSaved) {
    try {
      const e = JSON.parse(editSaved)
      Object.assign(baseOrder.value, e)
    } catch {}
  }
  // 初始化表单
  Object.assign(form, baseOrder.value)
  // 载入发货信息（若已发货）
  const shipSaved = localStorage.getItem(`shipping-${orderId}`)
  if (shipSaved) {
    try {
      const s = JSON.parse(shipSaved)
      shipping.expressVendor = s.expressVendor || ''
      shipping.expressNo = s.expressNo || ''
      shipping.images = Array.isArray(s.images) ? s.images : []
      shippingPreviews.value.splice(0, shippingPreviews.value.length, ...shipping.images)
    } catch {}
  }
})

// 表单
const form = reactive({
  id: orderId,
  orderNumber: '',
  storeId: 1,
  status: 1,
  shippingAddress: '',
  deviceType: 1,
  deviceTypeOther: '',
  deviceCapacity: 2,
  controllerCount: 1,
  preinstalledGames: '',
  startDate: '',
  rentalDuration: 2,
  rentalDurationOther: '',
  latestShippingDate: '',
  remarks: '',
})

// 发货信息（仅在已发货状态可编辑）
const shipping = reactive({
  expressVendor: '',
  expressNo: '',
  images: [],
})
const shippingPreviews = ref([])
const dragOver = ref(false)
const previewVisible = ref(false)
const previewImage = ref('')
const onShippingFilesChange = (e) => {
  const input = e.target
  if (!input.files) return
  const files = Array.from(input.files)
  shippingPreviews.value = [
    ...shippingPreviews.value,
    ...files.map(f => URL.createObjectURL(f))
  ]
}
const removeShippingImage = (i) => {
  shippingPreviews.value.splice(i, 1)
}

const onDrop = (e) => {
  dragOver.value = false
  const dropped = Array.from(e.dataTransfer?.files || [])
  if (!dropped.length) return
  const images = dropped.filter(f => f.type.startsWith('image/'))
  shippingPreviews.value = [
    ...shippingPreviews.value,
    ...images.map(f => URL.createObjectURL(f))
  ]
}

const openPreview = (url) => {
  previewImage.value = url
  previewVisible.value = true
}
const closePreview = () => {
  previewVisible.value = false
  previewImage.value = ''
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    // 额外校验：当选择“其他”时需填写自定义内容
    if (isOtherOption(form.deviceType) && !form.deviceTypeOther.trim()) return
    if (isOtherOption(form.rentalDuration) && !form.rentalDurationOther.trim()) return

    // 模拟保存到本地
    localStorage.setItem(`order-edit-${orderId}`, JSON.stringify(form))
    // 若为已发货，保存发货信息供详情页展示
    if (form.status === 2) {
      const payload = {
        expressVendor: shipping.expressVendor,
        expressNo: shipping.expressNo,
        images: shippingPreviews.value,
        shippedAt: form.latestShippingDate || new Date().toISOString(),
      }
      localStorage.setItem(`shipping-${orderId}`, JSON.stringify(payload))
    }
    await navigateTo(`/rentals/${orderId}`)
  } finally {
    submitting.value = false
  }
}
</script>


