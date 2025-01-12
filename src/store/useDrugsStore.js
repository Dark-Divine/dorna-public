import { create } from 'zustand'

export const useDrugStore = create((set) => ({
    drugs: [],
    setDrugs: (drugs) => set({ drugs }),
}))
