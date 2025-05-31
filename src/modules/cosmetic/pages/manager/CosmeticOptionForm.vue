<template>
  <form @submit.prevent="handleSubmit">
    <UFormGroup label="Tên thuộc tính" required>
      <UInput v-model="form.optionKey" required />
    </UFormGroup>
    <UFormGroup label="Giá trị" required>
      <UInput v-model="form.optionValue" required />
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
  option: { type: Object, default: null },
  isCreate: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
});
const emit = defineEmits(['submit', 'close']);

const form = ref({
  optionKey: '',
  optionValue: '',
});

watch(
  () => props.option,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      form.value = { optionKey: '', optionValue: '' };
    }
  },
  { immediate: true }
);

function handleSubmit() {
  emit('submit', { ...form.value });
}
</script>
