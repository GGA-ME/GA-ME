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

  interface StoreState {
    data: any;
    loading: boolean;
    error: AxiosError | null;
    userId: number;
    gameId: string;
    setUserId: (userId: number) => void;
    setGameId: (gameId: string) => void;
    fetchData: () => Promise<void>;
    likeGame: () => Promise<void>;
    unlikeGame: () => Promise<void>;
}

  const useStoreLike = create<StoreState>((set, get) => ({
    data: null,
    loading: false,
    error: null,
    userId: 0,
    gameId: 0,
    setUserId: (userId: number) => set({ userId }),
    setGameId: (gameId: number) => set({ gameId }),
    
    likeGame: async () => {
        const { userId, gameId } = get();
        set({ loading: true });
        try {
            const response = await api.post(`/api/game/like`, { userId, gameId });
            // 요청 성공 시 데이터 업데이트
            set({ loading: false });
            console.log("Like successful", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    },

    unlikeGame: async () => {
        const { userId, gameId } = get();
        set({ loading: true });
        try {
            const response = await api.delete(`/api/game/like`, { data: { userId, gameId }});
            // 요청 성공 시 데이터 업데이트
            set({ loading: false });
            console.log("Unlike successful", response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    }
    
}));

export default useStoreLike;