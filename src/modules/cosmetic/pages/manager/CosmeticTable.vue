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
                        <UButton color="primary" variant="soft" to="/manager/products/create"
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
                    :data="cosmetics"
                    :columns="columns"
                    :loading="isLoading"
                    :pagination="{ pageIndex: store.page, pageSize: store.limit }"
                    :options="{ getPaginationRowModel: getPaginationRowModel() }"
                    @rowSelection="handleView"
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
import { h, resolveComponent, computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCosmeticStore } from '@/modules/cosmetic/cosmetic.store';
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import type { Row } from '@tanstack/vue-table';
import type { GetAllCosmeticRes } from '../../cosmetic.dto';
import ConfirmDialog from '@/common/components/ConfirmDialog.vue';

const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const store = useCosmeticStore();
const router = useRouter();

const cosmetics = computed(() => store.cosmetics);
const isLoading = ref(false);
const search = ref('');
const error = ref<Error | null>(null);

const overlay = useOverlay();
const ConfirmModal = overlay.create(ConfirmDialog);

const handleEdit = (row: Row<GetAllCosmeticRes>) => {
    router.push(`/manager/products/${row.original.id}`);
};
const handleView = (row: Row<GetAllCosmeticRes>) => {
    router.push(`/cosmetic/${row.getValue('id')}`);
};
const handleDelete = async (row: Row<GetAllCosmeticRes>) => {
    ConfirmModal.open({
        title: 'Xoá sản phẩm',
        message: 'Bạn có chắc muốn xoá sản phẩm này?',
        confirmLabel: 'Xoá',
        cancelLabel: 'Hủy',
        confirmColor: 'error',
        onConfirm: () => {
            store.deleteCosmetic?.(row.original.id).then(() => {
                fetchCosmetics();
            });
            ConfirmModal.close();
        },
        onCancel: () => {
            ConfirmModal.close();
        },
    });
};
const handleToggleStatus = (row: Row<GetAllCosmeticRes>) => {
    alert('Chức năng đổi trạng thái chưa được triển khai');
};

function getRowItems(row: Row<GetAllCosmeticRes>) {
    return [
        { type: 'label', label: 'Hành động' },
        {
            label: 'Sửa',
            icon: 'i-lucide-edit',
            onSelect: () => handleEdit(row),
        },
        {
            label: 'Đổi trạng thái',
            icon: 'i-lucide-refresh-cw',
            children: [
                {
                    label: 'Hiển thị',
                    icon: 'i-lucide-check',
                    onSelect: () => handleToggleStatus(row),
                },
                {
                    label: 'Ẩn',
                    icon: 'i-lucide-x',
                    onSelect: () => handleToggleStatus(row),
                },
            ],
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

const columns: TableColumn<GetAllCosmeticRes>[] = [
    {
        accessorKey: 'image',
        header: 'Ảnh',
        cell: ({ row }) => h('img', { src: row.getValue('image'), width: 100, height: 100 }),
    },
    { accessorKey: 'name', header: 'Tên mỹ phẩm' },
    { accessorKey: 'stock', header: 'Số lượng' },
    {
        accessorKey: 'price',
        header: 'Giá',
        cell: ({ row }) => h('span', `${row.getValue('price')?.toLocaleString()}₫`),
    },
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
                        items: getRowItems(row),
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
