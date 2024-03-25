import { create } from 'zustand';

// 카트 아이탬 타입스크립트 선언식
interface CartItem {
  gameId: number;
  imageUrl: string;
  title: string;
  price: string;
  tags: string[];
}

// 추가, 제거, 비우기 함수
interface PoketStore {
  cartItems: CartItem[];
  addItem: (newItem: CartItem) => void;
  removeItem: (gameId: number) => void;
  clearCart: () => void;
}

// 스토어 생성
const usePoketStore = create<PoketStore>((set) => ({
  cartItems: [],

  // 같은 게임 아이디의 게임은 추가 x
  addItem: (newItem) => set((state) => {
    const exists = state.cartItems.some(item => item.gameId === newItem.gameId);
    if (!exists) {
      return { cartItems: [...state.cartItems, newItem] };
    }
    return state;
  }),

  // 장바구니 게임 빼기
  removeItem: (gameId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.gameId !== gameId)
  })),

  // 장바구니 초기화
  clearCart: () => set({ cartItems: [] }),
}));

export default usePoketStore;