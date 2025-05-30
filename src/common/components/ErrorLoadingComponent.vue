<template>
  <div class="error-message">
    <p>{{ errorMessage || 'Có lỗi xảy ra, vui lòng thử lại sau' }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  errorMessage: {
    type: String
  }
})
</script>

<style scoped>
.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 24px;
  color: red;
}
</style>
