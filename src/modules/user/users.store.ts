import { defineStore } from 'pinia';
import type { User, UserStatus } from './user.types';
import {
    changeUserStatusApi,
    createUserApi,
    deleteUserApi,
    getUserByIdApi,
    getUsersApi,
    updateUserApi,
} from './user.api';
import type { CreateUserReq, GetUserRes, UpdateUserReq } from './user.dto';

const toast = useToast();
export const useUsersStore = defineStore('users', () => {
    const users = ref<GetUserRes[]>([]);
    const user = ref<User | null>(null);
    const isUserLoading = ref(false);
    const isUserError = ref(false);
    const total = ref(0);
    const page = ref(1);
    const limit = ref(8);
    const sort = ref('createdAt');
    const order = ref('desc');
    const search = ref('');
    const status = ref<UserStatus | null>(null);
    const role = ref<'admin' | 'user' | null>(null);
    const isLoading = ref(false);
    const totalPages = ref(0);
    const getUsers = async () => {
        isLoading.value = true;
        try {
            const response = await getUsersApi(page.value, limit.value, search.value);
            users.value = response.users;
            total.value = response.total;
            page.value = response.page;
            limit.value = response.limit;
            totalPages.value = response.totalPages;
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi lấy danh sách người dùng!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const getUserById = async (id: string) => {
        isLoading.value = true;
        try {
            const response = await getUserByIdApi(id);

            user.value = response;
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi lấy thông tin người dùng!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const createUser = async (data: CreateUserReq) => {
        isLoading.value = true;
        try {
            await createUserApi(data);
            page.value = 1;
            await getUsers();
            toast.add({
                title: 'Tạo người dùng thành công!',
                color: 'success',
            });
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi tạo người dùng!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const updateUser = async (id: string, data: UpdateUserReq) => {
        isLoading.value = true;
        try {
            const response = await updateUserApi(id, data);
            users.value = users.value.map((user) => (user.id === id ? response : user));
            toast.add({
                title: 'Cập nhật người dùng thành công!',
                color: 'success',
            });
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi cập nhật người dùng!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const changeUserStatus = async (id: string, status: UserStatus) => {
        isLoading.value = true;
        try {
            await changeUserStatusApi(id, status);
            users.value = users.value.map((user) => (user.id === id ? { ...user, status } : user));
            toast.add({
                title: 'Thay đổi trạng thái người dùng thành công!',
                color: 'success',
            });
        } catch (err) {
            console.log(err);
            toast.add({
                title: (err as Error).message || 'Có lỗi khi thay đổi trạng thái người dùng!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const deleteUser = async (id: string) => {
        isLoading.value = true;
        try {
            await deleteUserApi(id);
            users.value = users.value.filter((user) => user.id !== id);
            toast.add({
                title: 'Xóa người dùng thành công!',
                color: 'success',
            });
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi xóa người dùng!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    return {
        users,
        user,
        isUserLoading,
        isUserError,
        total,
        page,
        limit,
        totalPages,

        getUsers,
        getUserById,
        createUser,
        updateUser,
        changeUserStatus,
        deleteUser,
    };
});
