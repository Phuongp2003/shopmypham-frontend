<template>
    <UTable
        :rows="options"
        :columns="columns"
        :loading="isLoading"
        :pagination="{ pageIndex: 1, pageSize: 10 }"
    >
        <template #actions="{ row }">
            <UButton size="xs" color="primary" @click="$emit('edit', row)">Sửa</UButton>
            <UButton size="xs" color="red" @click="$emit('delete', row)">Xoá</UButton>
        </template>
    </UTable>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import type { CosmeticOption } from '../../submodules/option/cosmesticOptions.types';
import { useCosmeticOptionStore } from '../../submodules/option/cosmeticOption.store';
const store = useCosmeticOptionStore();
const options = computed(() => store.options);
const isLoading = ref(false);

const fetchOptions = async () => {
    isLoading.value = true;
    await store.getAllOptions();
    isLoading.value = false;
};
const columns: TableColumn<CosmeticOption>[] = [
    { accessorKey: 'optionKey', header: 'Tên thuộc tính' },
    { accessorKey: 'optionValue', header: 'Giá trị' },
    { accessorKey: 'actions', header: 'Hành động' },
];

onMounted(async () => {
    await fetchOptions();
});
</script>
