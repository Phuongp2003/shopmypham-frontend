<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits<{ close: [created: boolean, data?: any] }>()
const form = ref({ name: '', description: '' })
function handleCreate() {
  // TODO: call API tạo mới
  emit('close', true, { ...form.value, id: Date.now().toString() })
}
</script>
<template>
  <UModal>
    <div class="p-6 w-96">
      <h3 class="text-lg font-bold mb-4">Thêm chính sách vận chuyển</h3>
      <UForm :state="form">
        <UFormField label="Tên chính sách" name="name">
          <UInput v-model="form.name" placeholder="Nhập tên chính sách" />
        </UFormField>
        <UFormField label="Mô tả" name="description">
          <UTextarea v-model="form.description" placeholder="Nhập mô tả" />
        </UFormField>
      </UForm>
      <div class="flex justify-end mt-4 gap-2">
        <UButton @click="emit('close', false)">Hủy</UButton>
        <UButton color="primary" @click="handleCreate">Tạo mới</UButton>
      </div>
    </div>
  </UModal>
</template>
