// src/pages/Search.tsx
// 담당자: 정라엘

import React from "react";
import useSearchStore from "../../stores/searchStore";
import GameCard from "../commonUseComponents/GameCard";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import style from "./Search.module.css";
import { motion } from "framer-motion";

const Result: React.FC = () => {
  // useSearchStore에서 검색 결과 가져오기
  const { results, isLoading } = useSearchStore();
  const navigate = useNavigate(); // useNavigate 인스턴스화

  // 간단한 onGameClick 함수 예제 (실제 동작은 구현해야 함)
  const handleGameClick = (gameId: number) => {
    navigate(`/detail/${gameId}`);
  };

  return (
    <div className="result-container pt-4 pr-4">
      {isLoading ? (
        <div className={style.loadingSpinner}></div>
      ) : results.length > 0 ? (
        <motion.ul
          className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {results.map((game, index: number) => (
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
                developer={game.gameDeveloper}
                beforPrice={`₩ ${game.gamePriceInitial/100}`}
                price={`₩ ${game.gamePriceFinal/100}`}
                tagsAll={game.tagList}
                tags={game?.tagList?.filter(tag => tag.codeId === "GEN" && tag.tagName.length < 7).map(tag => tag.tagName) ?? []}
                isPrefer={game.isPrefer}
                likes={game.gameLike}
                onGameClick={handleGameClick}
              />
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-center mt-[100px]">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default Result;
