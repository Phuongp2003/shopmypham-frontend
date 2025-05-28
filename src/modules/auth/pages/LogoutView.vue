<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/auth.store'
import { useLayoutStore } from '@/common/layout.store'
const router = useRouter()
const authStore = useAuthStore()
const layoutStore = useLayoutStore()
layoutStore.setLayoutByName('default')
authStore.logout()
router.push('/login')
</script>

<template>
  <div class="">
    <h1>Logout</h1>
    <p>You have been logged out successfully.</p>
  </div>
</template>
