import { create } from 'zustand'
import type { SortValue } from '@/types/global'

type SortState = {
  value: SortValue
  setValue: (value: SortValue) => void
}

const useSortStore = create<SortState>((set) => ({
  value: 'latest',
  setValue: (value: SortValue) => set({ value }),
}))

export default useSortStore
