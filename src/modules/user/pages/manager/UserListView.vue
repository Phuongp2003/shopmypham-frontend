<template>
  <div class="flex flex-col gap-6 min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8">
    <UCard class="w-10/12 mx-auto min-h-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <template #header>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Quản lý người dùng</h2>
          <div class="flex gap-2">
            <UInput v-model="search" placeholder="Tìm kiếm tên, email..." class="w-64" @change="fetchUsers" />
            <UButton color="primary" @click="fetchUsers">Tìm kiếm</UButton>
            <UButton color="primary" variant="soft" to="/manager/users/create">+ Thêm mới</UButton>
          </div>
        </div>
      </template>
      <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">Đang tải...</div>
      <div v-else-if="error" class="text-center py-8 text-red-500">Lỗi: {{ error.message }}</div>
      <div v-else>
        <UserTable />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from '../../users.store';
import { useRouter } from 'vue-router';
import UserTable from '../../components/manager/UserManageTable.vue';

const usersStore = useUsersStore();

const search = ref('');
const isLoading = ref(false);
const error = ref<Error | null>(null);

async function fetchUsers() {
  isLoading.value = true;
  error.value = null;
  try {
    await usersStore.getUsers();
  } catch (err) {
    error.value = err as Error;
  } finally {
    isLoading.value = false;
  }
}


onMounted(fetchUsers);
</script>
