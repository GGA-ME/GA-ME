import { create } from 'zustand';
import axios, { AxiosError } from 'axios';


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

  // API 응답 데이터의 타입을 정의합니다.
interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: [];
}

  interface StoreState {
    data: ApiResponse | null;
    loading: boolean;
    error: AxiosError | null;
    userId: number;
    gameId: number;
    setUserId: (userId: number) => void;
    userInfo: () => Promise<void>;
}

  const useStoreMyPage = create<StoreState>((set, get) => ({
    data: null,
    loading: false,
    error: null,
    userId: 0,
    gameId: 0,
    setUserId: (userId: number) => set({ userId }),
    
    userInfo: async () => {
        const { userId } = get();
        set({ loading: true });
        try {
            const response = await api.get(`/api/users/${userId}`);
            // 요청 성공 시 데이터 업데이트
            set({ loading: false });
            console.log("Like successful", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    },

    
}));

export default useStoreMyPage;