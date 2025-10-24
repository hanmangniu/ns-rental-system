<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// 等待插件初始化完成后再提供状态
onMounted(() => {
  const { $user, $isLoggedIn } = useNuxtApp()
  
  // 提供全局状态
  provide('user', $user)
  provide('isLoggedIn', $isLoggedIn)
})
</script>
