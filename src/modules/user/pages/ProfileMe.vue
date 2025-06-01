<template>
    <div class="flex justify-center items-center min-h-[60vh] bg-gray-100 dark:bg-gray-900">
        <UCard
            class="w-full max-w-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <UserAvatar :userName="user?.name || 'User'" />
                    <h2 class="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                        {{ user?.name }}
                    </h2>
                </div>
            </template>
            <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">
                Loading...
            </div>
            <div v-else-if="isError" class="text-center py-8 text-red-500">Error: {{ error }}</div>
            <div v-else class="flex flex-col gap-4 py-4 w-full">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200">Email:</span>
                        <span class="text-gray-900 dark:text-white">{{ user?.email }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200">Tên:</span>
                        <span class="text-gray-900 dark:text-white">{{ user?.name }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200"
                            >Số điện thoại:</span
                        >
                        <span class="text-gray-900 dark:text-white">{{
                            user?.phone || 'Chưa cập nhật'
                        }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200">Vai trò:</span>
                        <span class="text-gray-900 dark:text-white">{{ user?.role }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200"
                            >Trạng thái:</span
                        >
                        <span class="text-gray-900 dark:text-white">{{ user?.status }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200">Ngày tạo:</span>
                        <span class="text-gray-900 dark:text-white">{{
                            user?.createdAt ? new Date(user.createdAt).toLocaleString('vi-vn') : ''
                        }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200"
                            >Ngày cập nhật:</span
                        >
                        <span class="text-gray-900 dark:text-white">{{
                            user?.updatedAt ? new Date(user.updatedAt).toLocaleString('vi-vn') : ''
                        }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="font-medium text-gray-700 dark:text-gray-200">Google:</span>
                        <span class="text-gray-900 dark:text-white">
                            <template v-if="user?.googleId">
                                Đã liên kết với
                                <span class="font-semibold">{{ user?.googleEmail }}</span>
                                <UButton
                                    size="xs"
                                    color="error"
                                    variant="soft"
                                    class="ml-2"
                                    @click="handleUnlinkGoogle"
                                    >Hủy liên kết</UButton
                                >
                            </template>
                            <template v-else>
                                Chưa liên kết với Google
                                <UButton
                                    size="xs"
                                    color="primary"
                                    variant="soft"
                                    class="ml-2"
                                    @click="handleLinkGoogle"
                                    >Liên kết Google</UButton
                                >
                            </template>
                        </span>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <UButton color="primary" to="/profile/me/edit" class="font-semibold shadow-md"
                        >Sửa profile</UButton
                    >
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import UserAvatar from '@/common/components/UserAvatar.vue';
import { useUserProfile } from '../user.composable';
import { onMounted } from 'vue';

const { user, isLoading, isError, error, getUserProfile, unlinkGoogle } = useUserProfile();

const handleLinkGoogle = () => {
    // TODO: Missing header
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google/link`;
};
const handleUnlinkGoogle = async () => {
    await unlinkGoogle();
    await getUserProfile();
};

onMounted(() => {
    getUserProfile();
});
</script>
