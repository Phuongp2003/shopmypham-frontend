<template>
    <div class="loading-spinner" :class="{ 'full-screen': fullScreen }">
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
        <div class="loading-spinner-blade"></div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    fullScreen: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped>
.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.loading-spinner.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-spinner-blade {
    width: 10px;
    height: 50px;
    background-color: #007bff;
    animation: loading-spinner-blade 1.5s infinite;
}

@keyframes loading-spinner-blade {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
}
</style>
