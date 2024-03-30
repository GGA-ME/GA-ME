// src/stores/searchStore.tsx
import create from 'zustand';

interface Tag {
  codeId: string;
  tagId: number;
  tagName: string;
}

interface SearchResult {
  gameId: number,
  gameName: string,
  gameHeaderImg: string,
  gamePriceInitial: number,
  gamePriceFinal: number,
  gameDeveloper: string,
  gameLike: null,
  isPrefer: false,
  tagList: Tag[]
}

interface SearchState {
  results: SearchResult[]; // 검색 결과를 저장할 상태
  isLoading: boolean;
  setResults: (results: SearchResult[]) => void; // 검색 결과를 업데이트하는 액션
  setIsLoading: (loading: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  results: [],
  isLoading: false,
  setResults: (results) => set({ results }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useSearchStore;
