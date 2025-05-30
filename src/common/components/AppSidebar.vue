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
        label: 'Dashboard',
        icon: 'i-lucide-layout-dashboard',
        to: '/',
        active: false,
    },
    {
        label: 'Quản lý bài viết',
        icon: 'i-lucide-newspaper',
        to: '/articles',
        children: [
            {
                label: 'Tin tức',
                description: 'Quản lý tin tức',
                icon: 'i-lucide-newspaper',
                to: '/articles/news',
            },
            {
                label: 'Sự kiện',
                description: 'Quản lý sự kiện',
                icon: 'i-lucide-calendar',
                to: '/articles/events',
            },
        ],
    },
    {
        label: 'Quản lý biên bản phạt',
        icon: 'i-lucide-file-text',
        to: '/reports',
    },
    {
        label: 'Quản lý ETC',
        icon: 'i-lucide-file-text',
        to: '/ETCs',
    },
    {
        label: 'Quản lý giao dịch',
        icon: 'i-lucide-file-text',
        to: '/transactions',
    },
    {
        label: 'Quản lý người dùng',
        icon: 'i-lucide-users',
        to: '/users',
    },
];
</script>
