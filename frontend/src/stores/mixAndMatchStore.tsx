import { create } from "zustand";
import axios from "axios";

const api = axios.create({
  baseURL: "https://j10e105.p.ssafy.io",
  headers: {
    "Content-Type": `application/json;charset=UTF-8`,
    Accept: "application/json",
    // 추가
    "Access-Control-Allow-Origin": `http://localhost:5173/`,
    "Access-Control-Allow-Credentials": "true",
  },
});

interface RequestData {
  userId?: number; 
  gameIdAndTagDtoList: {
    gameId: number;
    tagList: TagDto[] | null | undefined;
  }[];
}

interface TagDto {
  codeId: string;
  tagId: number;
  tagName: string;
}

interface gameCardDto {
  gameId: number;
  gameName: string;
  gameHeaderImg: string;
  gamePriceInitial: number;
  gamePriceFinal: number;
  gameDeveloper: string;
  isPrefer: boolean | null;
  tagList: TagDto[];
}

interface SearchResult {
  tagDtoList: TagDto[],
  gameCardDtoList: gameCardDto[]
}

interface SearchState {
  results: SearchResult | null; // 검색 결과를 저장할 상태 // 검색 결과를 저장할 상태
  setResults: (results: SearchResult) => void; // 검색 결과를 업데이트하는 액션
  fetchData: (postData: RequestData) => void;
}

const useMixAndMatchStore = create<SearchState>((set) => ({
  results: null, // 초기 상태는 빈 배열
  setResults: (results) => set({ results }), // 검색 결과 업데이트

  fetchData: async (postData: RequestData) => {
    try {
      const response = await api.post(`/api/recommendations/search`, postData);
      // Zustand 스토어에 응답 데이터를 저장합니다.
      set({results:response.data.result})
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  },
}));

export default useMixAndMatchStore;
