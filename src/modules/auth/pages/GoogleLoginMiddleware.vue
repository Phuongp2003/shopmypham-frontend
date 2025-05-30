<template>
    <div class="flex items-center justify-center min-h-screen">
        <span>Đang xác thực Google...</span>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
const backendUrl = import.meta.env.VITE_API_BASE_URL;
onMounted(() => {
    window.location.href = `${backendUrl}/auth/google`;
});
</script>
