// src/pages/Search.tsx
// 담당자: 정라엘

import React from "react";
import useSearchStore from "../../stores/searchStore";
import GameCard from "../commonUseComponents/GameCard";
import style from "./Search.module.css";
import { motion } from "framer-motion";

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
      <motion.ul
        className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="visible"
      >
        {/* 로딩 중일 때는 로딩 스피너 표시 */}
        {isLoading ? (
          <div className={style.loadingSpinner}></div>
        ) : results.length > 0 ? (
          results.map((game, index: number) => (
            <motion.li
              key={index}
              className="list-none"
              variants={{
                hidden: { x: -60, opacity: 0 },
                visible: {
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.1 },
                },
              }}
            >
              <GameCard
                key={game.gameId}
                gameId={game.gameId}
                imageUrl={game.gameHeaderImg}
                title={game.gameName}
                beforPrice={game.gamePriceInitial.toLocaleString()}
                price={game.gamePriceFinal.toLocaleString()}
                developer={game.gameDeveloper}
                tagsAll={game.tagList}
                tags={
                  game.tagList ? game.tagList.map((tag) => tag.tagName) : []
                }
                likes={game.gameLike}
                isPrefer={false}
                onGameClick={() => handleGameClick(game.gameId)}
              />
            </motion.li>
          ))
        ) : (
          <p className="mt-[100px]">검색 결과가 없습니다.</p>
        )}
      </motion.ul>
    </div>
  );
};

export default Result;
