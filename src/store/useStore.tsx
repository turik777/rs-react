import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ICharStore {
  selectedCharIds: string[];
  toggle: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

export const useCharStore = create<ICharStore>()(
  persist(
    (set, get) => ({
      selectedCharIds: [],
      toggle: (id: string) =>
        set((state) => ({
          selectedCharIds: state.selectedCharIds.includes(id)
            ? state.selectedCharIds.filter((charId) => charId !== id)
            : [...state.selectedCharIds, id],
        })),
      clearAll: () => set({ selectedCharIds: [] }),
      isSelected: (id) => get().selectedCharIds.some((charId) => charId === id),
    }),
    {
      name: 'selectedChars-3iq6e',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
