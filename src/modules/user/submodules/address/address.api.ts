import type { Address } from './address.types';
import type { CreateAddressDto, UpdateAddressDto } from './address.dto';
import { api } from '@/plugins/axios';

export async function getAddressAllApi(): Promise<Address[]> {
    const res = await api.get<Address[]>('/users/addresses');
    return res.data;
}
export async function getAddressByIdApi(id: string): Promise<Address> {
    const res = await api.get<Address>(`/users/addresses/${id}`);
    return res.data;
}
export async function createAddressApi(data: CreateAddressDto): Promise<Address> {
    const res = await api.post<Address>('/users/addresses', data);
    return res.data;
}
export async function updateAddressApi(id: string, data: UpdateAddressDto): Promise<Address> {
    const res = await api.put<Address>(`/users/addresses/${id}`, data);
    return res.data;
}
export async function deleteAddressApi(id: string): Promise<void> {
    await api.delete(`/users/addresses/${id}`);
}
