import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PersonalData {
  name: string;
  email: string;
  birth: string;
  phone: string;
}

interface PersonalDataStore extends PersonalData {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBirth: (birth: string) => void;
  setPhone: (phone: string) => void;
  setAll: (data: Partial<PersonalData>) => void;
}

export const usePersonalDataStore = create<PersonalDataStore>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      birth: '',
      phone: '',
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setBirth: (birth) => set({ birth }),
      setPhone: (phone) => set({ phone }),
      setAll: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'personal-data-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
