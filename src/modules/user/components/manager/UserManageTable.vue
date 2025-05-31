<template>
  <div class="w-full h-[70vh] space-y-4 pb-4 flex flex-col justify-between">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="usersStore.users || []"
      :columns="columns"
      :options="{ getPaginationRowModel: getPaginationRowModel() }"
      class="flex-1"
    />

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="usersStore.page"
        :items-per-page="usersStore.limit"
        :total="usersStore.total"
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h, resolveComponent } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui/dist/runtime/types';
import type { User } from '../../user.types'
import { useRouter } from 'vue-router';

import { useUsersStore } from '../../users.store';

const router = useRouter();
const toast = useToast();
const usersStore = useUsersStore();
const emit = defineEmits(['edit', 'delete'])

const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');
const UBadge = resolveComponent('UBadge');

const pagination = ref({
  pageIndex: usersStore.page,
  pageSize: usersStore.limit
})

const table = ref()

const getRowItems = (row: User) => [
  {
    label: 'Sửa',
    icon: 'i-heroicons-pencil-square',
    onSelect: () => onEdit(row.id),
  },
  {
    label: 'Xóa',
    icon: 'i-heroicons-trash',
    color: 'error',
    onSelect: () => onDelete(row.id),
  },
  {
    label: 'Thay đổi trạng thái',
    icon: 'i-heroicons-arrow-path',
    children: [
      {
        label: 'Kích hoạt',
        icon: 'i-heroicons-check-circle',
        disabled: row.status === 'ACTIVE',
        onSelect: () => usersStore.changeUserStatus(row.id, 'ACTIVE'),
      },
      {
        label: 'Khóa',
        icon: 'i-heroicons-lock-closed',
        disabled: row.status === 'INACTIVE',
        onSelect: () => usersStore.changeUserStatus(row.id, 'INACTIVE'),
      },
    ],
  }
];

const columns: TableColumn<User>[] = [
  {
    accessorKey: 'name',
    header: 'Tên'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'phone',
    header: 'Điện thoại'
  },
  {
    accessorKey: 'role',
    header: 'Vai trò',
    cell: ({ row }) => {
      return h(
        UBadge,
        {
          color: row.original.role === 'admin' ? 'primary' : 'info',
          variant: 'solid',
        },
        row.original.role === 'admin' ? 'Quản trị viên' : 'Người dùng'
      );
    }
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      return h(
        UBadge,
        {
          color: row.original.status === 'ACTIVE' ? 'success' : 'error',
          variant: 'subtle',
          class: 'capitalize',
        },
        row.original.status
      );
    }
  },
  {
    id: 'actions',
    header: 'Hành động',
    cell: ({ row }) =>
      h(
        UDropdownMenu,
        { items: getRowItems(row.original) },
        () =>
          h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'subtle',
          })
      ),
  },
]

function onEdit(userId: string) {
  router.push(`/manager/users/${userId}`);
}

async function onDelete(userId: string) {
  await usersStore.deleteUser(userId);
}

const onPageChange = (page: number) => {
  usersStore.page = page;
  usersStore.getUsers();
}

</script>
