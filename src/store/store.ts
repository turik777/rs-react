import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { countries } from '../constants/countries';
import type { TFormData } from '../validation/schema';

interface FormState {
  countries: readonly string[];
  submittedForms: TFormData[];
  addForm: (data: TFormData) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      countries,
      submittedForms: [],
      addForm: (data) =>
        set((state) => ({
          submittedForms: [...state.submittedForms, data],
        })),
    }),
    {
      name: 'form-storage-3iq6e',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
