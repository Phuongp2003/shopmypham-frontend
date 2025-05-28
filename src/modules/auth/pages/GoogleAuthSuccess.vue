<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <span>Đăng nhập thành công!</span>
    <UButton @click="goHome" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Về trang chủ</UButton>
    <span v-if="countdown > 0">Tự động chuyển về trang chủ sau {{ countdown }} giây...</span>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countdown = ref(5)

function goHome() {
  router.push('/')
}

onMounted(() => {
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
    if (countdown.value <= 0) {
      clearInterval(timer)
      goHome()
    }
  }, 1000)
})
</script>
