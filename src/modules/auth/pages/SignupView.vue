<script setup lang="ts">
import { reactive } from 'vue';
import { z } from 'zod';
import { useRouter } from 'vue-router';
import type { RegisterReq } from '@/modules/auth/auth.dto';
import { useAuthStore } from '@/modules/auth/auth.store';

const schema = z
    .object({
        name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
        email: z.string().email('Email không hợp lệ'),
        phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 số'),
        password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    });

type SignupForm = z.infer<typeof schema>;

const state = reactive({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
});

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

async function onSubmit(event: { data: SignupForm }) {
    try {
        // Create RegisterReq from form data
        const registerReq: RegisterReq = {
            name: event.data.name,
            email: event.data.email,
            phone: event.data.phone,
            password: event.data.password,
        };

        // Use the register function from auth store
        await authStore.register(registerReq);

        toast.add({ title: 'Thành công', description: 'Đăng ký thành công.', color: 'success' });
        router.push('/');
    } catch (error) {
        console.error(error);
        toast.add({
            title: 'Lỗi',
            description: 'Đăng ký không thành công. Vui lòng thử lại.',
            color: 'error',
        });
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <UCard class="w-full max-w-md m-4 shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <div class="mb-8 text-center">
                <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Tạo Tài Khoản Mới</h1>
                <p class="text-gray-600 dark:text-gray-400">
                    Điền thông tin để tạo tài khoản của bạn
                </p>
            </div>
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormField label="Họ và tên" name="name">
                    <UInput
                        v-model="state.name"
                        type="text"
                        class="w-full"
                        placeholder="Nhập họ và tên của bạn"
                    />
                </UFormField>

                <UFormField label="Email" name="email">
                    <UInput
                        v-model="state.email"
                        type="email"
                        class="w-full"
                        placeholder="Nhập email của bạn"
                    />
                </UFormField>

                <UFormField label="Số điện thoại" name="phone">
                    <UInput
                        v-model="state.phone"
                        type="tel"
                        class="w-full"
                        placeholder="Nhập số điện thoại của bạn"
                    />
                </UFormField>

                <UFormField label="Mật khẩu" name="password">
                    <UInput
                        v-model="state.password"
                        type="password"
                        class="w-full"
                        placeholder="Nhập mật khẩu của bạn"
                    />
                </UFormField>

                <UFormField label="Xác nhận mật khẩu" name="confirmPassword">
                    <UInput
                        v-model="state.confirmPassword"
                        type="password"
                        class="w-full"
                        placeholder="Nhập lại mật khẩu của bạn"
                    />
                </UFormField>

                <div class="mt-8">
                    <UButton
                        type="submit"
                        color="primary"
                        block
                        class="py-3 font-semibold text-lg hover:bg-blue-700 bg-blue-500"
                    >
                        Đăng Ký
                    </UButton>
                    <div class="flex flex-col gap-3 mt-6">
                        <UButton
                            color="success"
                            block
                            class="border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
                            :to="`/auth/google`"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 48 48"
                            >
                                <g>
                                    <path
                                        fill="#4285F4"
                                        d="M43.611 20.083H42V20H24v8h11.303C33.972 32.833 29.418 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c2.69 0 5.164.957 7.104 2.53l6.084-6.084C33.527 6.163 28.977 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20c11.045 0 19.799-8.955 19.799-20 0-1.341-.138-2.651-.388-3.917z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M6.306 14.691l6.571 4.819C14.655 16.104 19.001 13 24 13c2.69 0 5.164.957 7.104 2.53l6.084-6.084C33.527 6.163 28.977 4 24 4c-7.732 0-14.41 4.388-17.694 10.691z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M24 44c5.356 0 10.236-1.833 14.045-4.978l-6.484-5.307C29.418 36 24 36 24 36c-5.408 0-9.957-3.162-11.297-7.917l-6.563 5.061C9.573 39.612 16.268 44 24 44z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M43.611 20.083H42V20H24v8h11.303c-1.13 3.017-4.303 5.917-11.303 5.917-5.408 0-9.957-3.162-11.297-7.917l-6.563 5.061C9.573 39.612 16.268 44 24 44c7.732 0 14.41-4.388 17.694-10.691z"
                                    />
                                </g>
                            </svg>
                            Đăng ký bằng Google
                        </UButton>
                        <div class="flex justify-center">
                            <UButton
                                variant="link"
                                class="text-blue-500 hover:underline p-0"
                                to="/auth/login"
                                >Đã có tài khoản? Đăng nhập</UButton
                            >
                        </div>
                    </div>
                </div>
            </UForm>
            <div class="flex justify-center mt-4">
                <UButton variant="outline" to="/">Về trang chủ</UButton>
            </div>
        </UCard>
    </div>
</template>
