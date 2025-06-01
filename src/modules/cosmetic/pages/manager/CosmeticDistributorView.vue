<template>
  <div class="flex flex-col gap-6 min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8">
    <UCard class="w-10/12 mx-auto min-h-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <template #header>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Quản lý nhà phân phối</h2>
          <div class="flex gap-2">
            <UInput v-model="store.search" placeholder="Tìm kiếm tên..." class="w-64" @change="fetchDistributors" />
            <UButton color="primary" @click="fetchDistributors">Tìm kiếm</UButton>
            <UButton color="primary" variant="soft" @click="openCreateModal">+ Thêm mới</UButton>
          </div>
        </div>
      </template>
      <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">Đang tải...</div>
      <div v-else-if="error" class="text-center py-8 text-red-500">Lỗi: {{ error.message }}</div>
      <div v-else>
        <UTable
          :data="distributors"
          :columns="columns"
          :loading="isLoading"
          :pagination="{ pageIndex: store.page, pageSize: store.limit }"
          :options="{ getPaginationRowModel: getPaginationRowModel() }"
          class="flex-1"
        />
        <div class="flex justify-center border-t border-default pt-4">
          <UPagination
            :default-page="store.page"
            :items-per-page="store.limit"
            :total="store.total"
            @update:page="onPageChange"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue';
import { useCosmeticDistributorStore } from '@/modules/cosmetic/submodules/distributor/cosmeticDistributor.store';
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import ConfirmDialog from '@/common/components/ConfirmDialog.vue';
import DistributorModal from '@/modules/cosmetic/components/manager/DistributorModal.vue';
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const UInput = resolveComponent('UInput');
const UCard = resolveComponent('UCard');
const UTable = resolveComponent('UTable');
const UPagination = resolveComponent('UPagination');

const store = useCosmeticDistributorStore();
const distributors = computed(() => store.distributors);
const isLoading = computed(() => store.isLoading);
const error = ref<Error | null>(null);

const overlay = useOverlay();
const ConfirmModal = overlay.create(ConfirmDialog);
const distributorModal = overlay.create(DistributorModal);

async function openCreateModal() {
  const instance = distributorModal.open({ isEditing: false });
  const result = (await instance) as { isCreated?: boolean; data?: any } | undefined;
  const { isCreated, data } = result || {};
  if (isCreated && data) {
    await store.createDistributor(data);
  }
  distributorModal.close();
}
async function openEditModal(row: any) {
  const instance = distributorModal.open({ isEditing: true, distributor: row });
  const result = (await instance) as { isCreated?: boolean; data?: any } | undefined;
  const { isCreated, data } = result || {};
  if (isCreated && data) {
    await store.updateDistributor(row.id, data);
  }
  distributorModal.close();
}
function handleDelete(row: any) {
  ConfirmModal.open({
    title: 'Xoá nhà phân phối',
    message: 'Bạn có chắc muốn xoá nhà phân phối này?',
    confirmLabel: 'Xoá',
    cancelLabel: 'Hủy',
    confirmColor: 'error',
    onConfirm: async () => {
      await store.deleteDistributor(row.id);
      ConfirmModal.close();
    },
    onCancel: () => ConfirmModal.close(),
  });
}

function getRowItems(row: any) {
  return [
    { type: 'label', label: 'Hành động' },
    {
      label: 'Sửa',
      icon: 'i-lucide-edit',
      onSelect: () => openEditModal(row),
    },
    { type: 'separator' },
    {
      label: 'Xoá',
      icon: 'i-lucide-trash',
      class: 'text-red-500',
      onSelect: () => handleDelete(row),
    },
  ];
}

const columns: TableColumn<any>[] = [
  { accessorKey: 'name', header: 'Tên nhà phân phối' },
  { accessorKey: 'address', header: 'Địa chỉ' },
  { accessorKey: 'phone', header: 'Số điện thoại' },
  { accessorKey: 'email', header: 'Email' },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            items: getRowItems(row.original),
            'aria-label': 'Actions dropdown',
            content: { align: 'end' },
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      ),
  },
];

const fetchDistributors = async () => {
  try {
    await store.getAllDistributors();
  } catch (err) {
    error.value = err as Error;
  }
};
const onPageChange = (page: number) => {
  store.page = page;
  fetchDistributors();
};

onMounted(() => {
  fetchDistributors();
});
</script>
