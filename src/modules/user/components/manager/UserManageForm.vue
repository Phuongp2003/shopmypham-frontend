<template>
    <UForm :schema="schema" :state="formState" class="space-y-6" @submit="onSubmit">
        <UFormField label="Email" name="email">
            <UInput v-model="formState.email" type="email" class="w-full" />
        </UFormField>
        <UFormField label="Tên" name="name">
            <UInput v-model="formState.name" type="text" class="w-full" />
        </UFormField>
        <UFormField label="Số điện thoại" name="phone">
            <UInput v-model="formState.phone" type="text" class="w-full" />
        </UFormField>
        <UFormField label="Vai trò" name="role">
            <USelect v-model="formState.role" :items="roleOptions" class="w-full" />
        </UFormField>
        <UFormField v-if="isCreate" label="Mật khẩu" name="password">
            <UInput v-model="formState.password" type="password" class="w-full" />
        </UFormField>
        <div class="flex justify-end">
            <UButton
                type="submit"
                color="primary"
                class="font-semibold shadow-md"
                :loading="loading"
            >
                Lưu
            </UButton>
        </div>
    </UForm>
</template>

<script setup lang="ts">
import { ref, reactive, watch, toRefs } from 'vue';
import { z } from 'zod';
import type { User, UserStatus } from '../../user.types';

const props = defineProps<{ user?: User; loading?: boolean; isCreate?: boolean }>();
const emit = defineEmits(['submit']);

const schema = z.object({
    email: z.string().email(),
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    phone: z.string().optional(),
    role: z.enum(['admin', 'user']),
    password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
];

const formState = reactive({
    email: '',
    name: '',
    phone: '',
    role: 'user',
    password: '',
});

watch(
    () => props.user,
    (val) => {
        if (val) {
            formState.email = val.email;
            formState.name = val.name;
            formState.phone = val.phone || '';
            formState.role = val.role;
            formState.password = '';
        }
    },
    { immediate: true },
);

function onSubmit() {
    emit('submit', { ...formState });
}
</script>
