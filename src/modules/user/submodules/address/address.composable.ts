import { ref } from 'vue';
import { createAddressApi, getAddressAllApi } from './address.api';
import type { Address } from './address.types';
import type { CreateAddressDto } from './address.dto';

export function useUserAddresses() {
  const addresses = ref<Address[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const selectedAddressId = ref<Address['id'] | undefined>(undefined);

  async function fetchAddresses() {
    isLoading.value = true;
    error.value = null;
    try {
      addresses.value = await getAddressAllApi();
      if (addresses.value.length > 0 && !selectedAddressId.value) {
        selectedAddressId.value = addresses.value[0].id;
      }
    } catch (e: any) {
      error.value = e.message || 'Lỗi khi lấy địa chỉ';
    } finally {
      isLoading.value = false;
    }
  }

  async function addAddress(data: CreateAddressDto) {
    isLoading.value = true;
    error.value = null;
    try {
      console.log(data);
      const newAddress = await createAddressApi(data);
      addresses.value.push(newAddress);
      selectedAddressId.value = newAddress.id;
    } catch (e: any) {
      error.value = e.message || 'Lỗi khi thêm địa chỉ';
    } finally {
      isLoading.value = false;
    }
  }

  return {
    addresses,
    isLoading,
    error,
    selectedAddressId,
    fetchAddresses,
    addAddress,
  };
}
