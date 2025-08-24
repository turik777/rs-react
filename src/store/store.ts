import { create } from 'zustand';
import { countries } from '../constants/countries';
import type { TFormData } from '../validation/schema';

interface FormState {
  countries: readonly string[];
  submittedForms: TFormData[];
  addForm: (data: TFormData) => void;
}

export const useFormStore = create<FormState>()((set) => ({
  countries,
  submittedForms: [],
  addForm: (data) =>
    set((state) => ({
      submittedForms: [...state.submittedForms, data],
    })),
}));
