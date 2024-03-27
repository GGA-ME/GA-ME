import { create } from 'zustand';

interface TagDto {
  codeId:string
  tagId:number
  tagName:string
}

// 카트 아이탬 타입스크립트 선언식 tagsAll추가
interface CartItem {
  gameId: number;
  imageUrl: string;
  title: string;
  price: string;
  tagsAll?: TagDto[] | null;
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
  cartItems: JSON.parse(sessionStorage.getItem('cartItems') || '[]'),

  // 같은 게임 아이디의 게임은 추가하지 않고, 최대 5개까지만 허용
  addItem: (newItem) => set((state) => {
    const exists = state.cartItems.some(item => item.gameId === newItem.gameId);
    if (!exists && state.cartItems.length < 5) { // 여기에 제한 조건 추가
      const newCartItems = [...state.cartItems, newItem];
      sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return { cartItems: newCartItems };
    }
    return state;
  }),

  // 장바구니 게임 빼기
  removeItem: (gameId) => set((state) => {
    const newCartItems = state.cartItems.filter(item => item.gameId !== gameId);
    sessionStorage.setItem('cartItems', JSON.stringify(newCartItems));
    return { cartItems: newCartItems };
  }),

  // 장바구니 초기화
  clearCart: () => set(() => {
    sessionStorage.removeItem('cartItems');
    return { cartItems: [] };
  }),
}));

export default usePoketStore;