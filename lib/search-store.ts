import { create } from 'zustand'

interface SearchState {
  query: string
  selectedTags: string[]
  isSearching: boolean
  setQuery: (query: string) => void
  setSelectedTags: (tags: string[]) => void
  setIsSearching: (isSearching: boolean) => void
  reset: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  selectedTags: [],
  isSearching: false,
  setQuery: (query) => set({ query }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  setIsSearching: (isSearching) => set({ isSearching }),
  reset: () => set({ query: '', selectedTags: [], isSearching: false }),
}))

