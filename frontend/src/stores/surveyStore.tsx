import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

// API 응답 데이터의 타입을 정의합니다.
interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: []; // `any` 대신 더 구체적인 타입을 사용해주세요.
}

interface SurveyStoreState{
    data: ApiResponse | null;
    loading: boolean;
    error: AxiosError | null;
    checkGameList: number[] | null;

    setCheckChoiceGame: (gameId: number) => void;
    fetchData: () => Promise<void>;
}

const api = axios.create({baseURL: 'https://j10e105.p.ssafy.io'});

export const surveyStore = create<SurveyStoreState>((set) => ({
    data: null,
    loading: false,
    error: null,
    checkGameList: null,

    setCheckChoiceGame(gameId: number) {
        this.checkGameList?.push(gameId);
    },

    fetchData: async() => {
        set({ loading: true });
        try {
            const response = await api.get<ApiResponse>(`/api/users/choice-game`);
            set({ data: response.data, loading: false });
            console.log();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    }
}));

