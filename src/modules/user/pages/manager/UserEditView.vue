<template>
    <div class="flex flex-col items-center min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8">
        <UCard
            class="w-full max-w-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Chỉnh sửa người dùng
                </h2>
            </template>
            <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">
                Đang tải...
            </div>
            <div v-else-if="error" class="text-center py-8 text-red-500">
                Lỗi: {{ error.message }}
            </div>
            <div v-else>
                <UserForm :user="user" @submit="onSubmit" :loading="isSaving" />
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from '../../users.store';
import UserForm from '../../components/manager/UserManageForm.vue';

const usersStore = useUsersStore();
const route = useRoute();

const user = ref();
const isLoading = ref(true);
const isSaving = ref(false);
const error = ref<Error | null>(null);

async function fetchUser() {
    isLoading.value = true;
    error.value = null;
    try {
        await usersStore.getUserById(route.params.id as string);
        user.value = usersStore.user;
    } catch (err) {
        error.value = err as Error;
    } finally {
        isLoading.value = false;
    }
}

async function onSubmit(form: any) {
    isSaving.value = true;
    await usersStore.updateUser(route.params.id as string, form);
    isSaving.value = false;
}

onMounted(fetchUser);
</script>
