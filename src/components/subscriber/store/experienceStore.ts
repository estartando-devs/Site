import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ExperienceData {
  experience: string;
  setExperience: (experience: string) => void;
  setAll: (data: Partial<ExperienceData>) => void;
}

export const useExperienceStore = create<ExperienceData>()(
  persist(
    (set) => ({
      experience: '',
      setExperience: (experience) => set({ experience }),
      setAll: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'experience-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
