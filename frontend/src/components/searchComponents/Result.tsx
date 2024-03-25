// src/pages/Search.tsx
// 담당자: 정라엘

import React from 'react';
import useSearchStore from '../../stores/searchStore';
import GameCard from '../commonUseComponents/GameCard';

const Result: React.FC = () => {
    // useSearchStore에서 검색 결과 가져오기
    const results = useSearchStore((state) => state.results);

    return (
        <div className="p-4">
            <h2 className="text-lg mb-4">검색 결과</h2>
            <div className="flex flex-wrap justify-center">
                {results.map((game) => (
                    <GameCard
                        key={game.gameId}
                        imageUrl={game.gameHeaderImg}
                        title={game.gameName}
                        price={game.gamePriceFinal.toLocaleString()}
                        tags={game.tagList ? game.tagList.map((tag) => tag.tagName) : []}
                        likes={0} // `likes` 값이 제공되지 않으므로 예시값인 0을 사용
                    />
                ))}
            </div>
        </div>
    );
};

export default Result;