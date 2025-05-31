<template>
  <form @submit.prevent="handleSubmit">
    <UFormGroup label="Tên mỹ phẩm" required>
      <UInput v-model="form.name" required />
    </UFormGroup>
    <UFormGroup label="Mô tả">
      <UTextarea v-model="form.description" />
    </UFormGroup>
    <UFormGroup label="Giá" required>
      <UInput v-model="form.price" type="number" required />
    </UFormGroup>
    <div class="flex gap-2 mt-4">
      <UButton type="submit" color="primary" :loading="loading">
        {{ isCreate ? 'Thêm mới' : 'Cập nhật' }}
      </UButton>
      <UButton type="button" @click="$emit('close')" color="gray">Huỷ</UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
const props = defineProps({
  cosmetic: { type: Object, default: null },
  isCreate: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(['submit', 'close']);

const form = ref({
  name: '',
  description: '',
  price: 0,
});

watch(
  () => props.cosmetic,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      form.value = { name: '', description: '', price: 0 };
    }
  },
  { immediate: true }
);

function handleSubmit() {
  emit('submit', { ...form.value });
}
</script>
