import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    getAllDistributorsApi,
    createDistributorApi,
    updateDistributorApi,
    deleteDistributorApi,
} from './cosmeticDistributor.api';
import type {
    CosmeticDistributorCreateReq,
    CosmeticDistributorUpdateReq,
} from './cosmeticDistributor.dto';

const toast = useToast?.() ?? { add: () => {} };
export const useCosmeticDistributorStore = defineStore('cosmeticDistributors', () => {
    const distributors = ref<any[]>([]);
    const isLoading = ref(false);
    const total = ref(0);
    const page = ref(1);
    const limit = ref(8);
    const search = ref('');
    const totalPages = ref(0);

    const getAllDistributors = async () => {
        isLoading.value = true;
        try {
            const params = {
                page: page.value,
                limit: limit.value,
                search: search.value,
            };
            const res = await getAllDistributorsApi(params);
            distributors.value = res.items || res.distributors || [];
            total.value = res.total || 0;
            page.value = res.page || 1;
            limit.value = res.limit || 1;
            totalPages.value = res.totalPages || 0;
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi lấy danh sách nhà phân phối!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const createDistributor = async (data: CosmeticDistributorCreateReq) => {
        isLoading.value = true;
        try {
            await createDistributorApi(data);
            await getAllDistributors();
            toast.add({ title: 'Tạo nhà phân phối thành công!', color: 'success' });
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi tạo nhà phân phối!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const updateDistributor = async (id: string, data: CosmeticDistributorUpdateReq) => {
        isLoading.value = true;
        try {
            await updateDistributorApi(id, data);
            await getAllDistributors();
            toast.add({ title: 'Cập nhật nhà phân phối thành công!', color: 'success' });
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi cập nhật nhà phân phối!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    const deleteDistributor = async (id: string) => {
        isLoading.value = true;
        try {
            await deleteDistributorApi(id);
            await getAllDistributors();
            toast.add({ title: 'Xoá nhà phân phối thành công!', color: 'success' });
        } catch (err) {
            toast.add({
                title: (err as Error).message || 'Có lỗi khi xoá nhà phân phối!',
                color: 'error',
            });
        } finally {
            isLoading.value = false;
        }
    };

    return {
        distributors,
        isLoading,
        total,
        page,
        limit,
        search,
        totalPages,
        getAllDistributors,
        createDistributor,
        updateDistributor,
        deleteDistributor,
    };
});
