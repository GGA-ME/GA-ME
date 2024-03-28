import { create } from "zustand";
import { api } from "../url/api";
import axios, { AxiosError } from "axios";

// interface로 response data들에 대한 타입을 미리 지정해줌
// dto랑 비슷한 느낌으로 사용
// result 내부에 원하는 정보에 존재함
interface ApiResponse {
    isSuccess: boolean;
    message: string;
    code: number;
    result: UserInfo; 
    tagWeightList: TagWeight[];
}
// 유저의 기본 정보와 선호 게임이 존재
interface UserInfo{
    userId: number;
    userName: string;
    userProfileImg: string;
    userAge: number;
    preferList: Prefer[];
}
// 선호하는 게임에 대한 정보가 존재
export interface Prefer{
    gameId: number;
    gameName: string;
    gameHeaderImg: string;
    gamePriceInitial: number;
    gamePriceFinal: number;
    gameDeveloper: string;
    gameLike: number;
    isPrefer: boolean;
    tagList: TagList[];
}
// 선호하는 게임에 대한 태그 정보들이 존재
interface TagList{
    codeId: string;
    tagId: number;
    tagName: string;
}
// 유저의 태그에 대한 정보가 존재
export interface TagWeight{
    userId: number;
    tagId: number;
    codeId: string;
    tagName: string;
    userTagWeight: number;
}
// zustand store에서 사용하기 위해서 미리 정보들을 초기화
const initialTagList: TagList = {
    codeId: '', tagId: 0, tagName: ''
}

const initialPrefer: Prefer = {
    gameId: 0,
    gameName: '',
    gameHeaderImg: '',
    gamePriceInitial: 0,
    gamePriceFinal: 0,
    gameDeveloper: '',
    gameLike: 0,
    isPrefer: true,
    tagList: [initialTagList]
}

const initialUser: UserInfo ={
    userId: 0,
    userName: '',
    userProfileImg: '',
    userAge: 0,
    preferList: [initialPrefer]
}

const initialTagWeight: TagWeight = {
    userId: 0,
    tagId: 0,
    codeId: '',
    tagName: '',
    userTagWeight: 0
}

const initialData: ApiResponse = {
    isSuccess: false,
    message: '', 
    code: 0, 
    result: initialUser,
    tagWeightList: [initialTagWeight]
}



interface detailState {
    data: ApiResponse;
    loading: boolean;
    error: AxiosError | null;
    topTenTag: TagWeight[];
    setData: (resData: ApiResponse) => void;
    fetchData: (userId: number) => void;
    // sendFavoriteGameList: () => void;
}

const detailStore = create<detailState>((set) => ({
    data: initialData,
    loading: false,
    error: null, 
    topTenTag: [],

    setData: (resData: ApiResponse) => set({ data: resData}),
    fetchData: async (userId: number) => {
        // const BASE_URL = "https://j10e105.p.ssafy.io/api";
        try{
            const response = await api.get(`/users/${userId}`);
            set({ data: response.data, loading: false });
            set(state => {
                const topTenTag: TagWeight[] = [];
                state.data.tagWeightList.forEach((tag: TagWeight) => {
                    topTenTag.push(tag);
                    if (topTenTag.length > 10) return;
                });
                return { ...state, topTenTag };
            })
        }
        catch(error){
            if (axios.isAxiosError(error)) {
                set({ error, loading: false });
            }            
        }
        
    },
    // sendFavoriteGameList: () => {
    //     set(state => {
    //         const topTenTag: TagWeight[] = [];
    //         state.data.tagWeightList.forEach((tag: TagWeight) => {
    //             topTenTag.push(tag);
    //             if (topTenTag.length > 10) return;
    //         });
    //         return { ...state, topTenTag };
    //     });
    // }

})) 

export default detailStore;