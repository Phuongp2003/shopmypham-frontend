import { defineStore } from 'pinia'
import { markRaw, type Component } from 'vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/modules/auth/auth.store'
import type { User } from '@/types/user/user.type'
import  router  from '@/router'

const metaData = await router.currentRoute.value.meta
export const useLayoutStore = defineStore('layoutControl', {
  state: () => ({
    currentLayout: markRaw(DefaultLayout) as Component,

    layouts: {
      blank: markRaw(BlankLayout),
      admin: markRaw(AdminLayout),
      default: markRaw(DefaultLayout),
    },

    layoutInitialized: false,
  }),

  getters: {
    // Get the current layout component
    layout: (state) => {
      if (metaData.layout) return metaData.layout
      return state.currentLayout
    },

    // Check if layout is initialized
    isLayoutInitialized: (state) => state.layoutInitialized,
  },

  actions: {
    // Set layout by direct component reference
    setLayout(layout: Component) {
      this.currentLayout = markRaw(layout)
      this.layoutInitialized = true
    },

    // Set layout by layout name from the layouts map
    setLayoutByName(name: 'blank' | 'admin' | 'default') {
      if (this.layouts[name]) {
        this.currentLayout = this.layouts[name]
        this.layoutInitialized = true
      }
    },

    // Set layout based on user type from userAuth store
    setLayoutByUserType(userType?: User['role'] | null) {
      // If userType is not provided, get it from the userAuth store
      const userStore = useAuthStore()
      const currentUserType = userType !== undefined ? userType : userStore.user?.role

      switch (currentUserType) {
        case 'admin':
          this.setLayoutByName('admin')
          break
        case 'user':
          this.setLayoutByName('default')
          break
        default:
          this.setLayoutByName('default')
      }
    },

    // Initialize layout based on current user
    initializeLayout() {
      const userStore = useAuthStore()

      // Only update layout if user cookies have been loaded
      if (userStore.isCookiesLoaded) {
        this.setLayoutByUserType(userStore.userType as User['role'])
      } else {
        this.setLayoutByName('default')
      }
    },

    // Reset layout to default
    resetLayout() {
      this.setLayoutByName('default')
      this.layoutInitialized = false
    },
  },
})
