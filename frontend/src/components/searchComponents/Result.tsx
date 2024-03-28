// src/pages/Search.tsx
// 담당자: 정라엘

import React from "react";
import useSearchStore from "../../stores/searchStore";
import GameCard from "../commonUseComponents/GameCard";
import style from "./Search.module.css";

const Result: React.FC = () => {
  // useSearchStore에서 검색 결과 가져오기
  const { results, isLoading } = useSearchStore();

  // 간단한 onGameClick 함수 예제 (실제 동작은 구현해야 함)
  const handleGameClick = (gameId: number) => {
    console.log(`Game clicked: ${gameId}`);
    // 여기에 게임 상세 페이지로 이동하거나 추가적인 액션을 취하는 로직 구현
  };

  return (
    <div className="p-4 mt-[50px]">
      <h2 className="mb-4 ml-[105px] font-sejong text-25">검색 결과</h2>
      <hr className={style.hr}></hr>
      <div className="flex flex-wrap justify-center">
        {/* 로딩 중일 때는 로딩 스피너 표시 */}
        {isLoading ? (
          <div className={style.loadingSpinner}></div>
        ) : results.length > 0 ? (
          results.map((game) => (
            <GameCard
              key={game.gameId}
              gameId={game.gameId}
              imageUrl={game.gameHeaderImg}
              title={game.gameName}
              price={game.gamePriceFinal.toLocaleString()}
              tagsAll={game.tagList}
              tags={game.tagList ? game.tagList.map((tag) => tag.tagName) : []}
              likes={game.gameLike}
              isPrefer={false}
              onGameClick={() => handleGameClick(game.gameId)}
            />
          ))
        ) : (
          <p className="mt-[100px]">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Result;
