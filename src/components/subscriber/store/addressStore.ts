import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AddressData {
  cep: string;
  address: string;
  district: string;
  city: string;
}

interface AddressStore extends AddressData {
  setCep: (cep: string) => void;
  setAddress: (address: string) => void;
  setDistrict: (district: string) => void;
  setCity: (city: string) => void;
  setAll: (data: Partial<AddressData>) => void;
}

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      cep: '',
      address: '',
      district: '',
      city: '',
      setCep: (cep) => set({ cep }),
      setAddress: (address) => set({ address }),
      setDistrict: (district) => set({ district }),
      setCity: (city) => set({ city }),
      setAll: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'address-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
