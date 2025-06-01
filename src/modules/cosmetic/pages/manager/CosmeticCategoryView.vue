<template>
  <div class="flex flex-col gap-8">
    <!-- Cosmetic Types (Enum) -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Các loại mỹ phẩm (CosmeticType)</h2>
      </template>
      <div class="flex flex-wrap gap-2">
        <UBadge v-for="type in cosmeticTypes" :key="type" color="primary">{{ type }}</UBadge>
      </div>
    </UCard>

    <!-- Cosmetic Options CRUD -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Thuộc tính tuỳ chọn (Options)</h2>
          <UButton @click="openCreateModal" color="primary">+ Thêm option</UButton>
        </div>
      </template>
      <CosmeticOptionTable @edit="openEditModal" @delete="onDeleteOption" />
      <UModal v-model="showModal">
        <CosmeticOptionForm
          :option="selectedOption as CosmeticOption"
          :is-create="isCreate"
          :loading="isLoading"
          @submit="onSubmit"
          @close="closeModal"
        />
      </UModal>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CosmeticOptionTable from './CosmeticOptionTable.vue';
import CosmeticOptionForm from './CosmeticOptionForm.vue';
import { useCosmeticOptionStore } from '../../submodules/option/cosmeticOption.store';
import type { CosmeticOption } from '../../submodules/option/cosmesticOptions.types';

const cosmeticTypes = [
  'SKINCARE', 'MAKEUP', 'HAIRCARE', 'FRAGRANCE', 'BODYCARE', 'NAILCARE', 'OTHER'
];

const showModal = ref(false);
const isCreate = ref(true);
const selectedOption = ref<CosmeticOption | null>(null);
const isLoading = ref(false);
const store = useCosmeticOptionStore();

function openCreateModal() {
  isCreate.value = true;
  selectedOption.value = null;
  showModal.value = true;
}
function openEditModal(option: any) {
  isCreate.value = false;
  selectedOption.value = option;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
async function onSubmit(form: any) {
  isLoading.value = true;
  if (isCreate.value) {
    await store.createOption(form);
  } else {
    await store.updateOption(selectedOption.value?.id as string, form);
  }
  isLoading.value = false;
  closeModal();
  await store.getAllOptions();
}
async function onDeleteOption(option: any) {
  if (confirm('Bạn có chắc muốn xoá option này?')) {
    isLoading.value = true;
    await store.deleteOption(option.id);
    isLoading.value = false;
    await store.getAllOptions();
  }
}
</script>
