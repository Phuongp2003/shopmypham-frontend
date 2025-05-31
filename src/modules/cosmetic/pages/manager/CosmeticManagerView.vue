<template>
  <UCard>
    <template #header>
      <UButton @click="openCreateModal">+ Thêm mới</UButton>
    </template>
    <CosmeticTable @edit="openEditModal" />
    <UModal v-model="showModal">
      <CosmeticForm
        :cosmetic="selectedCosmetic"
        :is-create="isCreate"
        :loading="isLoading"
        @submit="onSubmit"
        @close="closeModal"
      />
    </UModal>
  </UCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CosmeticTable from '@/modules/cosmetic/pages/manager/CosmeticTable.vue';
import CosmeticForm from '@/modules/cosmetic/pages/manager/CosmeticForm.vue';
import { useCosmeticStore } from '@/modules/cosmetic/cosmetic.store';
import type { Cosmetic } from '@/modules/cosmetic/cosmetic.types';
import type { CosmeticCreateReq, CosmeticUpdateReq } from '@/modules/cosmetic/cosmetic.dto';
import type { CosmeticOption } from '@/modules/cosmetic/submodules/option/cosmesticOptions.types';

const showModal = ref(false);
const isCreate = ref(true);
const selectedCosmetic = ref<Cosmetic | null>(null);
const isLoading = ref(false);
const store = useCosmeticStore();

function openCreateModal() {
  isCreate.value = true;
  selectedCosmetic.value = null;
  showModal.value = true;
}
function openEditModal(cosmetic: Cosmetic) {
  isCreate.value = false;
  selectedCosmetic.value = cosmetic;
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
async function onSubmit(form: CosmeticCreateReq | CosmeticUpdateReq) {
  isLoading.value = true;
  if (isCreate.value) {
    await store.createCosmetic(form);
  } else {
    await store.updateCosmetic(selectedCosmetic.value?.id!, form);
  }
  isLoading.value = false;
  closeModal();
  await store.getAllCosmetics();
}
</script>
