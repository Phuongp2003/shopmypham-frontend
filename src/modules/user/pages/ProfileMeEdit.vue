<template>
    <div
        class="flex flex-col md:flex-row gap-8 justify-center items-start min-h-[60vh] bg-gray-100 dark:bg-gray-900 py-8"
    >
        <!-- Profile Edit Card -->
        <UCard
            class="w-full max-w-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <UserAvatar :userName="user?.name || 'User'" />
                    <h2 class="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                        Chỉnh sửa thông tin cá nhân
                    </h2>
                </div>
            </template>
            <div v-if="isLoading" class="text-center py-8 text-gray-700 dark:text-gray-200">
                Loading...
            </div>
            <div v-else-if="isError" class="text-center py-8 text-red-500">Error: {{ error }}</div>
            <div v-else>
                <UForm
                    :schema="profileSchema"
                    :state="profileState"
                    class="space-y-6"
                    @submit="onProfileSubmit"
                >
                    <UFormField label="Email" name="email">
                        <UInput v-model="profileState.email" type="email" class="w-full" disabled />
                    </UFormField>
                    <UFormField label="Tên" name="name">
                        <UInput v-model="profileState.name" type="text" class="w-full" />
                    </UFormField>
                    <UFormField label="Số điện thoại" name="phone">
                        <UInput v-model="profileState.phone" type="text" class="w-full" />
                    </UFormField>
                    <div class="flex justify-end">
                        <UButton type="submit" color="primary" class="font-semibold shadow-md"
                            >Lưu thay đổi</UButton
                        >
                    </div>
                </UForm>
            </div>
        </UCard>

        <!-- Change Password Card -->
        <UCard
            class="w-full max-w-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
            <template #header>
                <div class="flex flex-col items-center gap-2">
                    <h2 class="text-xl font-semibold mt-2 text-gray-900 dark:text-white">
                        Đổi mật khẩu
                    </h2>
                </div>
            </template>
            <UForm :schema="passwordSchema" :state="passwordState" class="space-y-6">
                <UFormField label="Mật khẩu cũ" name="oldPassword" v-if="!user?.isNoPassword">
                    <UInput
                        v-model="passwordState.oldPassword"
                        type="password"
                        class="w-full"
                        placeholder="Nhập mật khẩu cũ"
                    />
                </UFormField>
                <UFormField label="Mật khẩu mới" name="newPassword">
                    <UInput
                        v-model="passwordState.newPassword"
                        type="password"
                        class="w-full"
                        placeholder="Nhập mật khẩu mới"
                    />
                </UFormField>
                <UFormField label="Nhập lại mật khẩu mới" name="confirmNewPassword">
                    <UInput
                        v-model="passwordState.confirmNewPassword"
                        type="password"
                        class="w-full"
                        placeholder="Nhập lại mật khẩu mới"
                    />
                </UFormField>
                <UFormField label="OTP" name="otp">
                    <div class="flex gap-2">
                        <UInput
                            v-model="passwordState.otp"
                            type="text"
                            class="w-full"
                            placeholder="Nhập mã OTP"
                        />
                        <UButton
                            type="button"
                            color="primary"
                            @click="onRequestOTP"
                            :loading="otpLoading"
                            >Nhận OTP</UButton
                        >
                    </div>
                </UFormField>
                <div class="flex justify-end">
                    <UButton
                        type="submit"
                        color="primary"
                        class="font-semibold shadow-md"
                        @click="onPasswordSubmit"
                        :loading="passwordLoading"
                        >Đổi mật khẩu</UButton
                    >
                </div>
            </UForm>
        </UCard>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { z } from 'zod';
import UserAvatar from '@/common/components/UserAvatar.vue';
import { useUserProfile } from '../user.composable';
import { useAuthStore } from '@/modules/auth/auth.store';
import { generateOTPKeyApi } from '@/modules/auth/auth.api';
import { changePasswordApi } from '../user.api';
import type { UpdateUserReq } from '../user.dto';

const authStore = useAuthStore();
const toast = useToast();
// Profile form
const { user, isLoading, isError, error, getUserProfile, updateUserProfile } = useUserProfile();

const profileSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    phone: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const profileState = reactive<ProfileForm>({
    email: '',
    name: '',
    phone: '',
}) as UpdateUserReq;

onMounted(async () => {
    await getUserProfile();
    if (user.value) {
        profileState.email = user.value.email;
        profileState.name = user.value.name;
        profileState.phone = user.value.phone || '';
    }
});

async function onProfileSubmit() {
    try {
        await updateUserProfile(profileState as unknown as UpdateUserReq);
        toast.add({
            title: 'Thành công',
            description: 'Cập nhật thông tin thành công.',
            color: 'success',
        });
        await getUserProfile();
    } catch (err) {
        toast.add({ title: 'Lỗi', description: 'Cập nhật thông tin thất bại.', color: 'error' });
    }
}

// Password change form
const passwordSchema = z
    .object({
        oldPassword: z.string().min(6, 'Mật khẩu cũ phải có ít nhất 6 ký tự'),
        newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
        confirmNewPassword: z.string().min(6, 'Nhập lại mật khẩu mới'),
        otp: z.string().min(4, 'OTP phải có ít nhất 4 ký tự'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Mật khẩu mới không khớp',
        path: ['confirmNewPassword'],
    });

type PasswordForm = z.infer<typeof passwordSchema>;

const passwordState = reactive<PasswordForm>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    otp: '',
});

const otpLoading = ref(false);
const passwordLoading = ref(false);

async function onRequestOTP() {
    if (!authStore.user?.email) {
        toast.add({
            title: 'Lỗi',
            description: 'Không tìm thấy email người dùng.',
            color: 'error',
        });
        return;
    }
    otpLoading.value = true;
    try {
        await generateOTPKeyApi({ email: authStore.user.email });
        toast.add({
            title: 'Thành công',
            description: 'OTP đã được gửi về email của bạn.',
            color: 'success',
        });
    } catch (err) {
        toast.add({ title: 'Lỗi', description: 'Gửi OTP thất bại.', color: 'error' });
    } finally {
        otpLoading.value = false;
    }
}

async function onPasswordSubmit() {
    passwordLoading.value = true;
    try {
        await changePasswordApi({
            oldPassword: passwordState.oldPassword,
            newPassword: passwordState.newPassword,
            otp: passwordState.otp,
        });
        toast.add({
            title: 'Thành công',
            description: 'Đổi mật khẩu thành công.',
            color: 'success',
        });
        passwordState.oldPassword = '';
        passwordState.newPassword = '';
        passwordState.confirmNewPassword = '';
        passwordState.otp = '';
    } catch (err) {
        toast.add({ title: 'Lỗi', description: 'Đổi mật khẩu thất bại.', color: 'error' });
    } finally {
        passwordLoading.value = false;
    }
}
</script>
