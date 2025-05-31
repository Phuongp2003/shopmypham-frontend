<template>
    <header
        class="sticky top-0 z-20 h-16 border-b border-pink-200/30 dark:border-pink-400/20 shadow-lg shadow-pink-500/10 dark:shadow-pink-400/10"
        style="
            background-color: rgba(253, 231, 243, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        "
    >
        <div class="h-full px-4 flex items-center justify-between">
            <ULink
                to="/"
                class="text-pink-gradient font-bold text-xl hover:scale-105 transition-transform duration-200"
            >
                DPT Cosmetics
            </ULink>
            <div class="flex items-center gap-4">
                <UNavigationMenu
                    :items="navItems"
                    class="w-auto justify-center"
                />
                <UButton
                    :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
                    color="primary"
                    variant="ghost"
                    class="text-soft-primary hover:bg-pink-100/50 dark:hover:bg-pink-400/10 transition-colors duration-200"
                    @click="toggleDark"
                />
                <div class="relative">
                    <UButton
                        to="/cart"
                        color="primary"
                        variant="ghost"
                        icon="i-lucide-shopping-cart"
                        class="text-soft-primary hover:bg-pink-100/50 dark:hover:bg-pink-400/10 transition-colors duration-200"
                    />
                    <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center border border-white dark:border-gray-900">
                        {{ cartCount }}
                    </span>
                </div>
                <UDropdownMenu
                    v-if="isAuthenticated"
                    :items="userMenuItems"
                    :content="{
                        align: 'end',
                        side: 'bottom',
                        sideOffset: 12,
                    }"
                    :ui="{
                        content:
                            'w-64 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2',
                        item: 'my-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
                    }"
                    :closeOnScroll="true"
                    :preventScroll="false"
                >
                    <UserAvatar />
                </UDropdownMenu>
                <UButton
                    v-else
                    to="/auth/login"
                    color="primary"
                    variant="soft"
                    class="bg-pink-100/80 hover:bg-pink-200/80 dark:bg-pink-400/20 dark:hover:bg-pink-400/30 text-pink-700 dark:text-pink-300 border border-pink-200/50 dark:border-pink-400/30 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
                >
                    Đăng nhập
                </UButton>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useColorScheme } from '@/common/composables/useColorScheme';
import UserAvatar from './UserAvatar.vue';
import { useAuthStore } from '@/modules/auth/auth.store';
import { useCartStore } from '@/modules/cart/cart.store';

const { isAuthenticated, user } = useAuthStore();
const { isDark, toggleDark } = useColorScheme();

const userMenuItems = ref([
    {
        label: 'Tài khoản',
        icon: 'i-lucide-user',
        to: '/profile/me',
    },
    {
        label: 'Đơn hàng',
        icon: 'i-lucide-package',
        to: '/order/list',
    },
    {
        label: 'Cài đặt',
        icon: 'i-lucide-settings',
        to: 'settings',
    },
    {
        label: 'Đăng xuất',
        icon: 'i-lucide-log-out',
        to: '/logout',
    },
]);

const navItems = ref([
    { label: 'Bài viết', icon: 'i-lucide-book', to: '/post/list' },
    { label: 'Sản phẩm', icon: 'i-lucide-box', to: '/cosmetic/list' },
]);

const cartCount = computed(() => {
    const cartStore = useCartStore();
    return cartStore.getCartItemCount;
});
</script>

<style scoped>
/* Custom navbar styling with dark mode support */
header {
    transition: all 0.3s ease;
}

.dark header {
    background-color: rgba(55, 65, 81, 0.95) !important;
}

/* Custom dropdown styling */
:deep(.dropdown-menu) {
    background-color: rgba(253, 231, 243, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgb(251 207 232 / 0.3);
    box-shadow: 0 25px 50px -12px rgb(236 72 153 / 0.1);
}

:deep(.dark .dropdown-menu) {
    background-color: rgba(55, 65, 81, 0.95);
    border: 1px solid rgb(244 114 182 / 0.2);
}

:deep(.dropdown-item) {
    color: var(--ui-text-primary);
    transition: all 0.2s ease;
    border-radius: 0.375rem;
}

:deep(.dropdown-item:hover) {
    background-color: rgb(251 207 232 / 0.5);
}

:deep(.dark .dropdown-item:hover) {
    background-color: rgb(244 114 182 / 0.1);
}
</style>
