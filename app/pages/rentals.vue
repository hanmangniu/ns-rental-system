<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">租赁管理</h1>
      <p class="mt-2 text-gray-600">管理所有租赁订单和设备</p>
    </div>

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">租赁管理功能</h3>
          <p class="mt-1 text-sm text-gray-500">此功能正在开发中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})
</script>
