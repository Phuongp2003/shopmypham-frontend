<template>
    <div class="flex flex-col gap-6 min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8">
        <UCard
            class="w-10/12 mx-auto min-h-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Quản lý mỹ phẩm
                    </h2>
                    <div class="flex gap-2">
                        <UInput
                            v-model="search"
                            placeholder="Tìm kiếm tên..."
                            class="w-64"
                            @change="fetchCosmetics"
                        />
                        <UButton color="primary" @click="fetchCosmetics">Tìm kiếm</UButton>
                        <UButton color="primary" variant="soft" to="/manager/cosmetics/create"
                            >+ Thêm mới</UButton
                        >
                    </div>
                </div>
            </template>
            <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">
                Đang tải...
            </div>
            <div v-else-if="error" class="text-center py-8 text-red-500">
                Lỗi: {{ error.message }}
            </div>
            <div v-else>
                <UTable
                    :data="
                        cosmetics
                    "
                    :columns="columns"
                    :loading="isLoading"
                    :pagination="{ pageIndex: store.page, pageSize: store.limit }"
                    :options="{ getPaginationRowModel: getPaginationRowModel() }"
                    class="flex-1"
                >
                </UTable>
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
import { computed, h, onMounted, ref } from 'vue';
import { useCosmeticStore } from '@/modules/cosmetic/cosmetic.store';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import type { Cosmetic } from '@/modules/cosmetic/cosmetic.types';
import { getPaginationRowModel } from '@tanstack/vue-table';
const store = useCosmeticStore();
const cosmetics = computed(() => store.cosmetics);
const isLoading = ref(false);
const search = ref('');
const error = ref<Error | null>(null);
const columns: TableColumn<Cosmetic>[] = [
    {
        accessorKey: 'image',
        header: 'Ảnh',
        cell: (row) => h('img', { src: row.getValue(), width: 100, height: 100 }),
    },
    { accessorKey: 'name', header: 'Tên mỹ phẩm' },
    { accessorKey: 'stock', header: 'Số lượng' },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: (row) => h('span', `${row.getValue()?.toLocaleString()}₫`),
    },
    { accessorKey: 'averageRating', header: 'Đánh giá trung bình' },
    { accessorKey: 'actions', header: 'Hành động' },
];
const fetchCosmetics = async () => {
    isLoading.value = true;
    await store.getAllCosmetics();
    isLoading.value = false;
};
const onPageChange = (page: number) => {
    store.page = page;
    fetchCosmetics();
};
onMounted(async () => {
    await fetchCosmetics();
});
</script>
