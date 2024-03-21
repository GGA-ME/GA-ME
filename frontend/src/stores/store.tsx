// import { create } from 'zustand';


// const store = create((set, get) => ({
//     data: [],
//     loading: false,
//     error: null,

//     // 매번 다르게 요청하기위한 변수 설정(예시 : 페이지)
//     page: 1,
//     setPage: (page: number) => set({ page }),

//     fetchData: async () => {

//         const { page } = get();

//         set({ loading: true });
//         try {
//             // 도메인주소로 할시에는 https로 바꿔줘야함
//             const response = await (url).get(`공용주소 이후의 주소 ${page}`,
//             );
//             set({ data: response.data, loading: false },
//                 // 맞게 왔는지 확인 하는 콘솔로그
//                 console.log(response.data));
//         } catch (error) {
//             set({ error, loading: false });
//         }
//     }
// }));

// export default store;