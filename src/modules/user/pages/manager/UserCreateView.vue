<template>
    <div class="flex flex-col items-center min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8">
        <UCard
            class="w-full max-w-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Thêm người dùng mới
                </h2>
            </template>
            <UserForm @submit="onSubmit" :loading="isLoading" :is-create="true" />
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsersStore } from '../../users.store';
import { useRouter } from 'vue-router';
import UserForm from '../../components/manager/UserManageForm.vue';
import type { CreateUserReq } from '@/modules/user/user.dto';

const usersStore = useUsersStore();
const router = useRouter();
const isLoading = ref(false);

async function onSubmit(form: CreateUserReq) {
    isLoading.value = true;
    await usersStore.createUser(form);
    router.push('/manager/users');
    isLoading.value = false;
}
</script>
