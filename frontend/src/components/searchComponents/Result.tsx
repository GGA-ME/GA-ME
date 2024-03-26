// src/pages/Search.tsx
// 담당자: 정라엘

import React from 'react';
import useSearchStore from '../../stores/searchStore';
import GameCard from '../commonUseComponents/GameCard';

const Result: React.FC = () => {
    // useSearchStore에서 검색 결과 가져오기
    const results = useSearchStore((state) => state.results);

        // 간단한 onGameClick 함수 예제 (실제 동작은 구현해야 함)
        const handleGameClick = (gameId: number) => {
            console.log(`Game clicked: ${gameId}`);
            // 여기에 게임 상세 페이지로 이동하거나 추가적인 액션을 취하는 로직 구현
        };

    return (
        <div className="p-4">
            <h2 className="text-lg mb-4">검색 결과</h2>
            <div className="flex flex-wrap justify-center">
                {results.map((game) => (
                    <GameCard
                        key={game.gameId}
                        gameId={game.gameId} // 젠킨슨 해결을 위해 추가
                        imageUrl={game.gameHeaderImg}
                        title={game.gameName}
                        price={game.gamePriceFinal.toLocaleString()}
                        tagsAll={game.tagList}
                        tags={game.tagList ? game.tagList.map((tag) => tag.tagName) : []}
                        likes={0} // `likes` 값이 제공되지 않으므로 예시값인 0을 사용
                        // 젠킨슨 오류해결을 위한 임시 코드
                        onGameClick={() => handleGameClick(game.gameId)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Result;