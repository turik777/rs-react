import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Character } from '../interface/interface';

interface ICharStore {
  selectedChars: Character[];
  toggle: (character: Character) => void;
  clearAll: () => void;
  isSelected: (id: string | undefined) => boolean;
}

export const useCharStore = create<ICharStore>()(
  persist(
    (set, get) => ({
      selectedChars: [],
      toggle: (character) =>
        set((state) => {
          const filtered = state.selectedChars.filter(
            (char) => char.id !== character.id
          );
          return {
            selectedChars:
              filtered.length < state.selectedChars.length
                ? filtered
                : [...filtered, character],
          };
        }),
      clearAll: () => set({ selectedChars: [] }),
      isSelected: (id) => get().selectedChars.some((char) => char.id === id),
    }),
    {
      name: 'selectedChars-3iq6e',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
