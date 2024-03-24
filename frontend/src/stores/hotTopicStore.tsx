import { create } from 'zustand';
import axios, { AxiosError } from 'axios';


// API 응답 데이터의 타입을 정의합니다.
interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: []; // `any` 대신 더 구체적인 타입을 사용해주세요.
}

interface SaleApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: SaleGameDto[]; // `any` 대신 더 구체적인 타입을 사용해주세요.
}
// SaleGameDto 타입 정의
interface SaleGameDto {
    salePercent: number;
    cardDtoList: CardDto[];
}
// CardDto 타입 정의
interface CardDto {
    gameId: number;
    gameName: string;
    gameHeaderImg: string;
    gamePriceInitial: number;
    gamePriceFinal: number;
    gameDeveloper: string;
    gameDiscountPercent: number;
    isPrefer: boolean;
    tagList: Array<{ codeId: string; tagName: string }>;
}

// 스토어 상태의 타입을 정의합니다.
interface StoreState {
    newsData: ApiResponse | null;
    saleData: SaleApiResponse | null;
    saleData10: CardDto[] | null;
    saleData30: CardDto[] | null;
    saleData50: CardDto[] | null;
    saleData75: CardDto[] | null;
    loading: boolean;
    error: AxiosError | null;
    userId: number;
    setUserId: (userId: number) => void;
    fetchNewsData: () => Promise<void>;
    fetchSalesData: () => Promise<void>;
}

const api = axios.create({
    // baseURL: 'https://j10e105.p.ssafy.io',
    baseURL: 'http://localhost:8000',
    headers: {
        "Content-Type": `application/json;charset=UTF-8`,
        "Accept": "application/json",      
        // 추가  
        "Access-Control-Allow-Origin": `http://localhost:5173/`,
        'Access-Control-Allow-Credentials':"true",
    }
  });

  const useHotTopicStore = create<StoreState>((set, get) => ({
    newsData: null,
    saleData: null,
    saleData10: null,
    saleData30: null,
    saleData50: null,
    saleData75: null,
    loading: false,
    error: null,
    
    userId: 1,//임시 1 처리 원래 0
    setUserId: (userId: number) => set({ userId }),

    fetchNewsData: async () => {
        const { userId } = get();
        const postData = { userId };
        set({ loading: true });
        try {
            const response = await api.post<ApiResponse>(`/api/topics/news`,postData);
            set({ newsData: response.data, loading: false });
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    },
    fetchSalesData: async () => {
        const { userId } = get();
        const postData = { userId };
        set({ loading: true });
        try {
            const response = await api.post<SaleApiResponse>(`/api/topics/discount`,postData);
            response.data.result.forEach((saleItem) => {
                switch (saleItem.salePercent) {
                    case 10:
                        set({ saleData10: saleItem.cardDtoList });
                        break;
                    case 30:
                        set({ saleData30: saleItem.cardDtoList });
                        break;
                    case 50:
                        set({ saleData50: saleItem.cardDtoList });
                        break;
                    case 75:
                        set({ saleData75: saleItem.cardDtoList });
                        break;
                    default:
                        break;
                }});
            set({ saleData: response.data, loading: false });
            console.log(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }
        }
    }
}));

export default useHotTopicStore;