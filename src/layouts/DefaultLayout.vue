<template>
  <div class="h-screen relative">
    <AppNavbar />
    <main class="flex-1 overflow-auto p-6 pt-20">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppPublicNavbar.vue'
</script>
