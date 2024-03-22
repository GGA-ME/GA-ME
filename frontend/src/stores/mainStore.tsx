import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://j10e105.p.ssafy.io',
    headers: {
        "Content-Type": `application/json;charset=UTF-8`,
        "Accept": "application/json",      
        // 추가  
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        'Access-Control-Allow-Credentials':"true",
    }
  });

const useStoreMain = create((set, get) => ({
    data: {},
    loading: false,
    error: null,

    // 매번 다르게 요청하기위한 변수 설정(예시 : 페이지)
    
    userId: 0,
    setUserId: (userId:number) => set({ userId }),
    
    codeId: '0',
    setCodeId: (codeId:string) => set({ codeId }),

    tagId: 0,
    setTagId: (tagId:number) => set({ tagId }),
    
    page: 1,
    setPage: (page: number) => set({ page }),

    size: 100,
    setSize: (size:number) => set({ size }),


    fetchData: async () => {

        // 다르게 사용할 변수 지정
        const { userId, codeId, tagId, page, size } = get();

        set({ loading: true });
        try {
            // 도메인주소로 할시에는 https로 바꿔줘야함
            const response = await api.get(
                `/api/recommendations/popular?userId=${userId}&codeId=${codeId}&tagId=${tagId}&page=${page}&size=${size}`,
            );
            set({ data: response.data, loading: false },
                // 맞게 왔는지 확인 하는 콘솔로그
                console.log(response.data));
        } catch (error) {
            set({ error, loading: false });
        }
    }
}));
// http://j10e105.p.ssafy.io:8000/api/recommendations/popular?userId=0&codeId=0&tagId=0&page=0&size=100
export default useStoreMain;