import React, { useEffect } from 'react';
import usePoketStore from '../../stores/poketStore'; // 스토어를 가져옵니다.

const Poket: React.FC = () => {
  const cartItems = usePoketStore(state => state.cartItems);

  return (
    <div className={`fixed top-0 right-10 flex flex-col items-center px-8 h-screen py-20 border-r-2 border-l-2 bg-gray-900 text-white z-40`}>
      <div className="mb-24">
        {cartItems.map((game, index) => (
          <div key={game.gameId} className="mb-4">
            <img src={game.imageUrl || '기본 아이콘 경로'} alt={game.title} className="w-8 h-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Poket;