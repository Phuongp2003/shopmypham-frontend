<template>
  <component :is="currentLayout" class="page-soft">
    <UApp class="bg-soft min-h-screen">
      <Suspense>
        <router-view class="bg-soft" />
      </Suspense>
    </UApp>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLayoutStore } from '@/common/layout.store'
import router from '@/router'

const layoutStore = useLayoutStore()

// Get the current layout or default to DefaultLayout
const currentLayout = computed(() => {
  const metaData = router.currentRoute.value.meta
  if (metaData.layout) layoutStore.setLayoutByName(metaData.layout as 'blank' | 'admin' | 'default')
  else layoutStore.setLayoutByName('default')
  return layoutStore.currentLayout
})
</script>

<style>
/* Ensure soft theme is applied globally */
html, body {
  background-color: var(--ui-bg-base) !important;
  color: var(--ui-text-primary) !important;
}

/* Override any default Nuxt UI styles */
.nuxt-ui-app {
  background-color: var(--ui-bg-base) !important;
}
</style>
