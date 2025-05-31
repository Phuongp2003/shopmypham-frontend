import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAllOptionsApi,
  createOptionApi,
  updateOptionApi,
  deleteOptionApi,
  getOptionByIdApi,
} from './cosmeticOption.api';
import type { CosmeticOptionCreateReq, CosmeticOptionUpdateReq } from './cosmesticOptions.dto';

const toast = useToast?.() ?? { add: () => {} };
export const useCosmeticOptionStore = defineStore('cosmeticOptions', () => {
  const options = ref<any[]>([]);
  const isLoading = ref(false);

  const getAllOptions = async () => {
    isLoading.value = true;
    try {
      const res = await getAllOptionsApi();
      options.value = Array.isArray(res) ? res : (res.options || []);
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi lấy danh sách option!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  const createOption = async (data: CosmeticOptionCreateReq) => {
    isLoading.value = true;
    try {
      await createOptionApi(data);
      await getAllOptions();
      toast.add({ title: 'Tạo option thành công!', color: 'success' });
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi tạo option!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  const updateOption = async (id: string, data: CosmeticOptionUpdateReq) => {
    isLoading.value = true;
    try {
      await updateOptionApi(id, data);
      await getAllOptions();
      toast.add({ title: 'Cập nhật option thành công!', color: 'success' });
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi cập nhật option!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  const deleteOption = async (id: string) => {
    isLoading.value = true;
    try {
      await deleteOptionApi(id);
      await getAllOptions();
      toast.add({ title: 'Xoá option thành công!', color: 'success' });
    } catch (err) {
      toast.add({
        title: (err as Error).message || 'Có lỗi khi xoá option!',
        color: 'error',
      });
    } finally {
      isLoading.value = false;
    }
  };

  return { options, isLoading, getAllOptions, createOption, updateOption, deleteOption };
});
