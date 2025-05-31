import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAllCosmeticsApi,
  createCosmeticApi,
  updateCosmeticApi,
} from './cosmetic.api';
import type { CosmeticCreateReq, CosmeticUpdateReq, GetAllCosmeticRes } from './cosmetic.dto';

const toast = useToast();
export const useCosmeticStore = defineStore('cosmetics', () => {
  const cosmetics = ref<GetAllCosmeticRes[]>([]);
  const isLoading = ref(false);
  const total = ref(0);
  const page = ref(1);
  const limit = ref(4);
  const totalPages = ref(0);

  const getAllCosmetics = async () => {
    isLoading.value = true;
    try {
      const res = await getAllCosmeticsApi({ page: page.value, limit: limit.value });
      cosmetics.value = res.cosmetics || [];
      total.value = res.total || 0;
      totalPages.value = res.totalPages || 0;
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi lấy danh sách mỹ phẩm!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  const createCosmetic = async (data: CosmeticCreateReq) => {
    isLoading.value = true;
    try {
      await createCosmeticApi(data);
      await getAllCosmetics();
      toast.add({ title: 'Tạo mỹ phẩm thành công!', color: 'success' });
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi tạo mỹ phẩm!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updateCosmetic = async (id: string, data: CosmeticUpdateReq) => {
    isLoading.value = true;
    try {
      await updateCosmeticApi(id, data);
      await getAllCosmetics();
      toast.add({ title: 'Cập nhật mỹ phẩm thành công!', color: 'success' });
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi cập nhật mỹ phẩm!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    cosmetics,
    isLoading,
    total,
    page,
    limit,
    totalPages,
    getAllCosmetics,
    createCosmetic,
    updateCosmetic,
  };
});
