<template>
    <div class="p-4">
        <UCard>
            <template #header>
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold">Quản lý bài viết</h2>
                    <UButton icon="i-heroicons-plus" label="Tạo bài viết" color="primary" @click="navigateToCreate" />
                </div>
                <div class="flex flex-wrap gap-2 items-end mb-2">
                    <UInput v-model="search" placeholder="Tìm kiếm tiêu đề..." class="w-64" @keyup.enter="applyFilters" />
                    <USelectMenu v-model="selectedStatus" :items="statusOptions" value-key="value" placeholder="Trạng thái" class="w-40" />
                    <UButton label="Lọc" color="primary" icon="i-heroicons-funnel" @click="applyFilters" />
                    <UButton label="Đặt lại" color="gray" variant="ghost" icon="i-heroicons-arrow-path" @click="resetFilters" />
                </div>
            </template>
            <UTable
                :data="posts"
                :columns="columns"
                :loading="loading"
                class="w-full"
            >
                <template #actions-data="{ row }">
                    <UDropdownMenu :items="getRowItems(row)">
                        <UButton color="neutral" variant="ghost" icon="i-lucide-ellipsis-vertical" />
                    </UDropdownMenu>
                </template>
            </UTable>
            <template #footer>
                <div class="flex justify-between items-center mt-4">
                    <div class="text-sm text-gray-500">
                        Hiển thị {{ posts.length }} bài viết
                    </div>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, resolveComponent } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '../post.store';
import { storeToRefs } from 'pinia';

const router = useRouter();
const postStore = usePostStore();
const { posts, loading } = storeToRefs(postStore);

const search = ref('');
const selectedStatus = ref();
const statusOptions = [
    { label: 'Tất cả', value: undefined },
    { label: 'Công khai', value: true },
    { label: 'Nháp', value: false },
];

const UDropdownMenu = resolveComponent('UDropdownMenu')
const UButton = resolveComponent('UButton')

onMounted(() => {
    postStore.fetchPosts();
});

function applyFilters() {
    const params: any = {};
    if (search.value) params.search = search.value;
    if (selectedStatus.value !== undefined) params.published = selectedStatus.value;
    postStore.fetchPosts(params);
}

function resetFilters() {
    search.value = '';
    selectedStatus.value = undefined;
    postStore.fetchPosts();
}

function navigateToCreate() {
    router.push({ path: '/manager/post/create' });
}

function getRowItems(row: any) {
    return [
        {
            label: 'Sửa bài viết',
            icon: 'i-heroicons-pencil-square',
            to: `/manager/post/edit/${row.id}`,
            type: 'link',
        },
        {
            type: 'separator',
        },
        {
            label: 'Xoá bài viết',
            icon: 'i-heroicons-trash',
            color: 'error',
            onSelect: () => postStore.deletePost(row.id),
        },
    ];
}

const columns = [
    {
        accessorKey: 'title',
        header: 'Tiêu đề',
    },
    {
        accessorKey: 'createdAt',
        header: 'Thời gian tạo',
        cell: ({ row }: any) => new Date(row.original.createdAt).toLocaleString('vi-VN'),
    },
    {
        accessorKey: 'published',
        header: 'Trạng thái',
        cell: ({ row }: any) => row.original.published ? 'Công khai' : 'Nháp',
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) =>
            h(UDropdownMenu, { items: getRowItems(row.original) }, () =>
                h(UButton, {
                    icon: 'i-lucide-ellipsis-vertical',
                    color: 'neutral',
                    variant: 'subtle',
                }),
            ),
    },
];

watch([search, selectedStatus], ([s, st], [oldS, oldSt]) => {
    if (s === '' && st === undefined && (oldS !== '' || oldSt !== undefined)) {
        postStore.fetchPosts();
    }
});
</script>
