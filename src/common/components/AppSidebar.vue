<template>
    <USlideover
        side="left"
        title="DTP Cosmetics CMS"
        :ui="{
            content: 'z-50',
        }"
    >
        <UButton icon="i-lucide-menu" color="neutral" variant="subtle" />
        <template #body>
            <UNavigationMenu orientation="vertical" :items="menuItems" class="w-full px-2" />
        </template>
    </USlideover>
</template>

<script setup lang="ts">
const menuItems = [
    {
        label: 'Tổng quan',
        icon: 'i-lucide-layout-dashboard',
        to: '/manager/dashboard',
        active: false,
    },
    {
        label: 'Quản lý bài viết',
        icon: 'i-lucide-newspaper',
        to: '/manager/articles',
    },
    {
        label: 'Quản lý sản phẩm',
        icon: 'i-lucide-box',
        to: '/manager/products',
        children: [
            {
                label: 'Sản phẩm',
                icon: 'i-lucide-box',
                to: '/manager/products',
            },
            {
                label: 'Danh mục sản phẩm',
                icon: 'i-lucide-list-ordered',
                to: '/manager/products/categories',
            },
            {
                label: 'Nhà phân phối',
                icon: 'i-lucide-truck',
                to: '/manager/distributors',
            }
        ],
    },
    {
        label: 'Quản lý đơn hàng',
        icon: 'i-lucide-shopping-cart',
        to: '/manager/orders',
    },
    {
        label: 'Quản lý thanh toán',
        icon: 'i-lucide-credit-card',
        to: '/manager/payments',
    },
    {
        label: 'Quản lý người dùng',
        icon: 'i-lucide-users',
        to: '/manager/users',
    },
];
</script>
