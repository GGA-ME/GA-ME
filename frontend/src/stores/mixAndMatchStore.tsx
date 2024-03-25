import { create } from 'zustand'
import axios, { AxiosError } from 'axios';

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
    loading: boolean,
    error: AxiosError | null,
    results: SearchResult[]; // 검색 결과를 저장할 상태
    setResults: (results: SearchResult[]) => void; // 검색 결과를 업데이트하는 액션
  }

// API 응답 데이터의 타입을 정의합니다.
interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: {
        tagDtoList: Tag[];
        gameCardDtoList: SearchResult[];
    }; // `any` 대신 더 구체적인 타입을 사용해주세요.
}

const api = axios.create({
    baseURL: 'https://j10e105.p.ssafy.io',
    headers: {
        "Content-Type": `application/json;charset=UTF-8`,
        "Accept": "application/json",      
        // 추가  
        "Access-Control-Allow-Origin": `http://localhost:5173/`,
        'Access-Control-Allow-Credentials':"true",
    }
  });


interface RequestData {
    userId: number;
    gameIdAndTagDtoList: {
      gameId: number;
      tagList: {
        codeId: string;
        tagId: number;
        tagName: string;
      }[];
    }[];
  }




const mixAndMatchStore = create<SearchState>((set) =>({
    // data: null,
    loading: false,
    error: null,

    results: [],// 초기 상태는 빈 배열
    setResults: (results) => set({ results }), // 검색 결과 업데이트

    fetchData: async (postData: RequestData) => {
        try {
            console.log("store!!!")
            const response = await api.post<ApiResponse>(`/api/recommendations/search`, postData);
            set({ loading: true });
            // Zustand 스토어에 응답 데이터를 저장합니다.
            //set({ result: response.data.result, loading: false });
            console.log("mixAndMatchStore response: ", response.data);
            return response.data;
            // return response
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    }

}));

export default mixAndMatchStore;