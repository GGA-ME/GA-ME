import { create } from 'zustand';
import axios, { AxiosError } from 'axios';


// API 응답 데이터의 타입을 정의합니다.
interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: []; // `any` 대신 더 구체적인 타입을 사용해주세요.
}

// 스토어 상태의 타입을 정의합니다.
interface StoreState {
    data: ApiResponse | null;
    loading: boolean;
    error: AxiosError | null;
    userId: number;
    codeId: string;
    tagId: number;
    page: number;
    size: number;
    setUserId: (userId: number) => void;
    setCodeId: (codeId: string) => void;
    setTagId: (tagId: number) => void;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
    fetchData: () => Promise<void>;
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

  const useStoreMain = create<StoreState>((set, get) => ({
    data: null,
    loading: false,
    error: null,
    
    userId: 0,
    setUserId: (userId: number) => set({ userId }),
    
    codeId: '0',
    setCodeId: (codeId: string) => set({ codeId }),

    tagId: 0,
    setTagId: (tagId: number) => set({ tagId }),
    
    page: 1,
    setPage: (page: number) => set({ page }),

    size: 100,
    setSize: (size: number) => set({ size }),

    fetchData: async () => {
        const { userId, codeId, tagId, page, size } = get();
        set({ loading: true });
        try {
            const response = await api.get<ApiResponse>(`/api/recommendations/popular?userId=${userId}&codeId=${codeId}&tagId=${tagId}&page=${page}&size=${size}`,);
            set({ data: response.data, loading: false });
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    }
}));

export default useStoreMain;