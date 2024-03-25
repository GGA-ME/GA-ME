// src/stores/searchStore.tsx
import create from 'zustand';

interface Tag {
  codeId: string;
  tagId: number;
  tagName: string;
}

interface SearchResult {
  gameId: number;
  gameName: string;
  gameHeaderImg: string;
  gamePriceInitial: number;
  gamePriceFinal: number;
  gameDeveloper: string;
  isPrefer: boolean | null;
  tagList: Tag[];
}

interface SearchState {
  results: SearchResult[]; // 검색 결과를 저장할 상태
  setResults: (results: SearchResult[]) => void; // 검색 결과를 업데이트하는 액션
}

const useSearchStore = create<SearchState>((set) => ({
  results: [], // 초기 상태는 빈 배열
  setResults: (results) => set({ results }), // 검색 결과 업데이트
}));

export default useSearchStore;
