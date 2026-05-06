import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ReasonData {
  reason: string;
  setReason: (reason: string) => void;
  setAll: (data: Partial<ReasonData>) => void;
}

export const useReasonStore = create<ReasonData>()(
  persist(
    (set) => ({
      reason: '',
      setReason: (reason) => set({ reason }),
      setAll: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'reason-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
