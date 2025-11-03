<template>
  <div>
    <!-- 面包屑 -->
    <nav class="mb-6 text-sm text-gray-500">
      <NuxtLink to="/rentals" class="hover:underline">租赁管理</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink :to="`/rentals/${orderId}`" class="hover:underline">租赁详情</NuxtLink>
      <span class="mx-2">/</span>
      <span>发货</span>
    </nav>

    <!-- 标题 -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">订单发货</h1>
        <p class="mt-1 text-gray-600">订单编号：{{ shippingForm.orderNumber || '-' }}</p>
      </div>
      <NuxtLink
        :to="`/rentals/${orderId}`"
        class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >返回详情</NuxtLink>
    </div>

    <!-- 表单 -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">发货信息</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">快递平台 <span class="text-red-500">*</span></label>
              <div class="mt-2 space-y-2">
                <label v-for="v in expressVendors" :key="v.id" class="flex items-center">
                  <input
                    v-model="shippingForm.expressVendor"
                    :value="v.id"
                    type="radio"
                    required
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ v.name }}</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">快递单号 <span class="text-red-500">*</span></label>
              <input
                v-model="shippingForm.expressNo"
                type="text"
                required
                placeholder="请输入快递单号"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 发货图片 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">发货图片</h3>
          <div
            class="mb-4 border-2 border-dashed rounded-md p-6 text-center"
            :class="dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300'"
            @dragover.prevent="dragOver = true"
            @dragleave.prevent="dragOver = false"
            @drop.prevent="onDrop"
          >
            <p class="text-sm text-gray-600 mb-2">拖拽图片到此处上传，或</p>
            <label for="upload" class="cursor-pointer text-indigo-600 hover:text-indigo-800 hover:underline">点击选择文件</label>
            <input id="upload" type="file" multiple accept="image/*" class="hidden" @change="onFilesChange" />
          </div>

          <div v-if="previews.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="(url, i) in previews" :key="url" class="relative group">
              <img :src="url" class="w-full h-32 object-cover rounded border cursor-zoom-in" @click="openPreview(url)" />
              <button type="button" @click="removeImage(i)" class="absolute top-1 right-1 hidden group-hover:inline-flex bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                删除
              </button>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">支持多张图片，建议清晰展示打包与面单。</p>
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
          {{ submitting ? '提交中...' : '确认发货' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// 选项：快递平台
import { expressVendors } from "../../../../utils/rentalOptions"

definePageMeta({ layout: 'default' })

const route = useRoute()
const orderId = Number(route.params.id)

const submitting = ref(false)
const files = ref([])
const previews = ref([])
const dragOver = ref(false)
const previewVisible = ref(false)
const previewImage = ref('')

// 简单模拟：从本地缓存读取订单编号
const shippingForm = reactive({
  orderNumber: '',
  expressVendor: 1,
  expressNo: '',
  images: [],
})

onMounted(() => {
  // 若详情页曾保存过订单编号，可展示；否则忽略
  const saved = localStorage.getItem(`order-${orderId}`)
  if (saved) {
    try {
      const o = JSON.parse(saved)
      shippingForm.orderNumber = o.orderNumber || ''
    } catch {}
  }

  // 载入已保存的发货信息
  const shipSaved = localStorage.getItem(`shipping-${orderId}`)
  if (shipSaved) {
    try {
      const s = JSON.parse(shipSaved)
      shippingForm.expressVendor = s.expressVendor || ''
      shippingForm.expressNo = s.expressNo || ''
      shippingForm.images = Array.isArray(s.images) ? s.images : []
      previews.value = [...shippingForm.images]
    } catch {}
  }
})

const onFilesChange = (e) => {
  const input = e.target
  if (!input.files) return
  files.value = Array.from(input.files)
  // 预览
  previews.value = [
    ...previews.value,
    ...files.value.map(f => URL.createObjectURL(f))
  ]
}

const onDrop = (e) => {
  dragOver.value = false
  const dropped = Array.from(e.dataTransfer?.files || [])
  if (!dropped.length) return
  const images = dropped.filter(f => f.type.startsWith('image/'))
  previews.value = [
    ...previews.value,
    ...images.map(f => URL.createObjectURL(f))
  ]
}

const removeImage = (index) => {
  previews.value.splice(index, 1)
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
  if (!shippingForm.expressVendor || !shippingForm.expressNo) return
  submitting.value = true
  try {
    // 模拟上传，将预览地址当作已存储图片
    const payload = {
      expressVendor: shippingForm.expressVendor,
      expressNo: shippingForm.expressNo,
      images: previews.value,
      shippedAt: new Date().toISOString(),
    }
    localStorage.setItem(`shipping-${orderId}`, JSON.stringify(payload))

    // 可选：更新订单状态为已发货（2）
    const listKey = 'orders-status-overwrite'
    const overwrite = JSON.parse(localStorage.getItem(listKey) || '{}')
    overwrite[orderId] = 2
    localStorage.setItem(listKey, JSON.stringify(overwrite))

    await navigateTo('/rentals')
  } finally {
    submitting.value = false
  }
}
</script>


