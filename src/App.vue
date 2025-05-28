<template>
  <component :is="currentLayout">
    <UApp>
      <Suspense>
        <router-view />
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
