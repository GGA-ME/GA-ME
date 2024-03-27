// src/stores/useUserStore.tsx
import create from 'zustand';
import axios from 'axios';

interface User {
  userId: number;
  userName: string;
  userProfileImg: string;
  isNewUser: boolean;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  fetchAndSetUser: (accessToken: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: true }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  fetchAndSetUser: async (accessToken) => {
    try {
      const response = await axios.post('/api/auth/kakao/callback', {
        accessToken,
      });
      if (response.data.isSuccess) {
        // 백엔드 응답에서 사용자 정보를 추출
        const userInfo = response.data.result;
        // 사용자 정보를 스토어에 저장
        set({
          user: {
            userId: userInfo.userId,
            userName: userInfo.userName,
            userProfileImg: userInfo.userProfileImg,
            isNewUser: userInfo.isNewUser,
          },
          isLoggedIn: true,
        });

        console.log('사용자 정보: ');
        console.log(userInfo);
      } else {
        // 응답이 실패했을 경우의 처리
        console.error(response.data.message);
        set({ isLoggedIn: false });
      }
    } catch (error) {
      console.error('사용자 정보 요청 실패:', error);
      set({ isLoggedIn: false });
    }
  },
}));

export default useUserStore;
