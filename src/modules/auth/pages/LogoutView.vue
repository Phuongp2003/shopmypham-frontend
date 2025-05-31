<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/modules/auth/auth.store';
import { useLayoutStore } from '@/common/layout.store';
import { useCartStore } from '@/modules/cart/cart.store';
const router = useRouter();
const authStore = useAuthStore();
const layoutStore = useLayoutStore();
layoutStore.setLayoutByName('default');
await authStore.logout().then(() => {
    const cartStore = useCartStore();
    cartStore.clearCart();
    router.push('/login');
});
</script>

<template>
    <div class="">
        <h1>Logout</h1>
        <p>You have been logged out successfully.</p>
    </div>
</template>
