// src/stores/useUserStore.tsx
import create from 'zustand'

interface User {
  userId: number;
  userName: string;
  userProfileImg: string;
  isNewUser: boolean;
}

export interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set(() => ({ user })),
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
}));

export default useUserStore;
