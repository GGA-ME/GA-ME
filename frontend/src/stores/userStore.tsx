// src/stores/useUserStore.tsx
import create from 'zustand'

interface User {
  userId: number;
  userName: string;
  userProfileImg: string;
  isNewUser: boolean;
}

interface UserState {
  user: User | null; 
  isLoggedIn: boolean; // 로그인 상태를 나타내는 상태 추가
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void; // 로그인 상태 설정 메소드 추가
}

const useUserStore = create<UserState>((set) => ({
  user: null, // 사용자 정보 초기 상태는 null
  isLoggedIn: false, // 초기 로그인 상태는 false
  // 사용자 정보 업데이트 메소드
  setUser: (user) => {
    console.log('사용자 정보 저장 완료:', user); // 사용자 정보 저장 시 로그 출력
    set({ user, isLoggedIn: true }); // 사용자 정보 업데이트 및 로그인 상태를 true로 설정
  },
  // 로그인 상태 설정 메소드
  setIsLoggedIn: (isLoggedIn) => {
    set({ isLoggedIn });
  }
})); 

export default useUserStore;
