import create from 'zustand';
import {api} from '../url/api.tsx'

// 사용 스토어의 구조를 기반으로 하는 구조
export interface Game {
    gameId: number;
    gameName: string;
    gameHeaderImg: string;
    gamePriceFinal: number;
  // 각 태그를 기준으로 각 태그 및 이름을 가진 경우 선언방법
    tagList: Array<{ codeId: string; tagId:number; tagName: string }>;
  }

export interface Screenshot {
    path_full: string;
    path_thumbnail: string;
    id: number;
}

export interface GameData {
    gameId: number;
    gameName: string;
    gameShortDescription: string;
    gameDetailedDescription: string;
    gameHeaderImg: string;
    gameWebsite: string;
    gameDeveloper: string;
    gamePublisher: string;
    gamePriceInitial: number;
    gamePriceFinal: number;
    gameDiscountPercent: number;
    gameReleaseDate: string;
    screenshotList: Screenshot[];
    relatedGameList: Game[]; // 관련 게임 데이터에 대한 정확한 타입이 없는 경우 any로 지정
    tagList: Array<{ codeId: string; tagId:number; tagName: string }>;
    isLike: boolean;
}

interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: GameData; // GameData 타입의 배열
}

type DetailState = {
    data: ApiResponse | null;

    fetchData: (userId: number | undefined, gameId: number | undefined) => Promise<void>;
    toggleIsLike: ()=> void;
};


export const useDetailStore = create<DetailState>((set) => ({
    data: null,
    fetchData: async (userId, gameId) => {
    // 데이터 가져오는 비동기 요청
    try {
        const response = await api.get<ApiResponse>(`/api/games/${gameId}/info/${userId}`,);
        set({ data: response.data });
        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
  },
    // isLike 값을 변경하는 함수
    toggleIsLike: () => {
        set((state: DetailState) => {
            if (state.data) {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        result: {
                            ...state.data.result,
                            isLike: !state.data.result.isLike
                        }
                    }
                };
            }
            return state; // data가 null인 경우에는 상태를 그대로 반환
        });
    }
}
));
