<template>
  <div>
    <!-- 面包屑 -->
    <nav class="mb-6 text-sm text-gray-500">
      <NuxtLink to="/rentals" class="hover:underline">租赁管理</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink :to="`/rentals/${orderNumber}`" class="hover:underline">租赁详情</NuxtLink>
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
          :to="`/rentals/${orderNumber}`"
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
              <div class="mt-1 flex gap-2">
                <input
                  v-model="shippingForm.expressNo"
                  type="text"
                  required
                  placeholder="请输入快递单号"
                  class="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  @click="openScanner('expressNo')"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span class="ml-2">扫描</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 设备信息 -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">设备信息</h3>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">主机序列号</label>
              <div class="mt-1 flex gap-2">
                <input
                  v-model="shippingForm.consoleSerial"
                  type="text"
                  placeholder="请输入或扫描主机序列号"
                  class="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  @click="openScanner('consoleSerial')"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span class="ml-2">扫描</span>
                </button>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">主机内置充电电池</label>
                  <input
                    v-model="shippingForm.batterySerial"
                    type="text"
                    placeholder="请输入电池信息"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Joy-Con (L) 序列号</label>
                  <input
                    v-model="shippingForm.joyconLeft"
                    type="text"
                    placeholder="请输入左手柄序列号"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Joy-Con (R) 序列号</label>
                  <input
                    v-model="shippingForm.joyconRight"
                    type="text"
                    placeholder="请输入右手柄序列号"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
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
            <p class="text-sm text-gray-600 mb-3">拖拽图片到此处上传，或</p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <label for="upload-camera" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                拍照
              </label>
              <input id="upload-camera" type="file" accept="image/*" capture="environment" class="hidden" @change="onFilesChange" />
              
              <label for="upload-gallery" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                从相册选择
              </label>
              <input id="upload-gallery" type="file" multiple accept="image/*" class="hidden" @change="onFilesChange" />
            </div>
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

      <!-- 扫描条形码 Modal -->
      <div v-if="scannerVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">扫描条形码</h3>
            <button
              type="button"
              @click="closeScanner"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6">
            <div id="scanner-container" class="w-full bg-black rounded-lg overflow-hidden mb-4" style="min-height: 300px;"></div>
            <p class="text-sm text-gray-600 text-center">请将条形码对准扫描框</p>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end space-x-2">
        <NuxtLink :to="`/rentals/${orderNumber}`" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
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
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"

definePageMeta({ layout: 'default' })

const route = useRoute()
const orderNumber = route.params.id

// 临时：与列表页一致的模拟数据（用于查找订单 id）
const mockOrders = ref([
  {
    id: 1,
    orderNumber: 'R20250115001',
  },
  {
    id: 2,
    orderNumber: 'R20250115002',
  },
  {
    id: 3,
    orderNumber: 'R20250115003',
  },
])

// 通过 orderNumber 查找订单，获取实际 id
const order = computed(() => {
  return mockOrders.value.find(o => o.orderNumber === orderNumber)
})

const orderId = computed(() => {
  return order.value?.id || null
})

const submitting = ref(false)
const files = ref([])
const previews = ref([])
const dragOver = ref(false)
const previewVisible = ref(false)
const previewImage = ref('')
const scannerVisible = ref(false)
const html5QrcodeScanner = ref(null)
const scannerTarget = ref(null)

// 简单模拟：从本地缓存读取订单编号
const shippingForm = reactive({
  orderNumber: '',
  expressVendor: 1,
  expressNo: '',
  consoleSerial: '',
  batterySerial: '',
  joyconLeft: '',
  joyconRight: '',
  images: [],
})

onMounted(() => {
  if (!orderId.value) return
  
  // 设置订单编号
  shippingForm.orderNumber = orderNumber
  
  // 若详情页曾保存过订单编号，可展示；否则忽略
  const saved = localStorage.getItem(`order-${orderId.value}`)
  if (saved) {
    try {
      const o = JSON.parse(saved)
      shippingForm.orderNumber = o.orderNumber || orderNumber
    } catch {}
  }

  // 载入已保存的发货信息
  const shipSaved = localStorage.getItem(`shipping-${orderId.value}`)
  if (shipSaved) {
    try {
      const s = JSON.parse(shipSaved)
      shippingForm.expressVendor = s.expressVendor ?? shippingForm.expressVendor
      shippingForm.expressNo = s.expressNo || ''
      shippingForm.consoleSerial = s.consoleSerial || ''
      shippingForm.batterySerial = s.batterySerial || ''
      shippingForm.joyconLeft = s.joyconLeft || ''
      shippingForm.joyconRight = s.joyconRight || ''
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

/**
 * @param {'expressNo' | 'consoleSerial'} target
 */
const openScanner = async (target) => {
  scannerTarget.value = target
  scannerVisible.value = true
  await nextTick()
  
  try {
    // 检查是否支持摄像头 API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("您的浏览器不支持摄像头功能，请使用现代浏览器（Chrome、Edge、Firefox 等）")
      scannerTarget.value = null
      scannerVisible.value = false
      return
    }

    // 检查协议：非 localhost 需要 HTTPS
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    const isHttps = window.location.protocol === 'https:'
    if (!isLocalhost && !isHttps) {
      alert("摄像头功能需要 HTTPS 协议。\n\n请使用 https:// 访问，或使用 localhost 访问。\n\n如果已配置 HTTPS，请刷新页面后重试。")
      scannerTarget.value = null
      scannerVisible.value = false
      return
    }

    const containerId = "scanner-container"
    html5QrcodeScanner.value = new Html5Qrcode(containerId)
    
    await html5QrcodeScanner.value.start(
      { facingMode: "environment" }, // 使用后置摄像头
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_93,
        ],
      },
      (decodedText) => {
        if (scannerTarget.value) {
          shippingForm[scannerTarget.value] = decodedText
        }
        closeScanner()
      },
      () => {
        // 扫描失败（忽略，继续扫描）
      }
    )
  } catch (err) {
    console.error("启动扫描器失败:", err)
    let errorMsg = "无法启动摄像头"
    
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      errorMsg = "摄像头权限被拒绝，请在浏览器设置中允许访问摄像头"
    } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      errorMsg = "未找到摄像头设备，请检查设备连接"
    } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      errorMsg = "摄像头被其他应用占用，请关闭其他使用摄像头的应用后重试"
    } else if (err.message) {
      errorMsg = `启动失败: ${err.message}`
    }
    
    alert(errorMsg)
    scannerVisible.value = false
    scannerTarget.value = null
  }
}

const closeScanner = async () => {
  if (html5QrcodeScanner.value) {
    try {
      await html5QrcodeScanner.value.stop()
      await html5QrcodeScanner.value.clear()
    } catch (err) {
      console.error("停止扫描器失败:", err)
    }
    html5QrcodeScanner.value = null
  }
  scannerVisible.value = false
  scannerTarget.value = null
}

// 组件卸载时清理扫描器
onUnmounted(() => {
  if (html5QrcodeScanner.value) {
    html5QrcodeScanner.value.stop().catch(() => {})
  }
})

const handleSubmit = async () => {
  if (!shippingForm.expressVendor || !shippingForm.expressNo) return
  if (!orderId.value) return
  
  submitting.value = true
  try {
    // 模拟上传，将预览地址当作已存储图片
    const payload = {
      expressVendor: shippingForm.expressVendor,
      expressNo: shippingForm.expressNo,
      consoleSerial: shippingForm.consoleSerial,
      batterySerial: shippingForm.batterySerial,
      joyconLeft: shippingForm.joyconLeft,
      joyconRight: shippingForm.joyconRight,
      images: previews.value,
      shippedAt: new Date().toISOString(),
    }
    localStorage.setItem(`shipping-${orderId.value}`, JSON.stringify(payload))

    // 可选：更新订单状态为已发货（2）
    const listKey = 'orders-status-overwrite'
    const overwrite = JSON.parse(localStorage.getItem(listKey) || '{}')
    overwrite[orderId.value] = 2
    localStorage.setItem(listKey, JSON.stringify(overwrite))

    await navigateTo('/rentals')
  } finally {
    submitting.value = false
  }
}
</script>


