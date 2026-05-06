import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const KNOWN_FROM_OPTIONS = [
  'instagram',
  'linkedin',
  'youtube',
  'discord',
  'google',
  'indicacao',
  'evento',
  'outro',
] as const;

export type KnownFrom = typeof KNOWN_FROM_OPTIONS[number];

interface SourceData {
  knownFrom: KnownFrom | '';
  setKnownFrom: (knownFrom: KnownFrom | '') => void;
  setAll: (data: Partial<SourceData>) => void;
}

export const useSourceStore = create<SourceData>()(
  persist(
    (set) => ({
      knownFrom: '',
      setKnownFrom: (knownFrom) => set({ knownFrom }),
      setAll: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: 'source-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
