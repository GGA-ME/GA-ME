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

  const handleGameClick = (gameId: number) => {
    navigate(`/detail/${gameId}`);
  };

  // 랜덤 메시지 배열
  const noResultsMessages = [
    "한 번 더 시도해보시겠어요? 😅",
    "앗! 결과를 찾지 못했어요! 😵",
    "엥? 게임이 안 보여요! 😳"
  ];

  // 랜덤 인덱스를 선택하여 메시지를 결정
  const randomMessageIndex = Math.floor(Math.random() * noResultsMessages.length);
  const randomMessage = noResultsMessages[randomMessageIndex];

  return (
    <div className="result-container pt-4 pr-4">
      {isLoading ? (
        <div className="flex">
          <div className={style.loader}></div>
          <p className={style.text}> 결과를 불러오는 중 👀</p>
        </div>
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
                beforPrice={`₩ ${game.gamePriceInitial/100}`}
                price={`₩ ${game.gamePriceFinal/100}`}
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
          ))}
        </motion.ul>
      ) : (
        <p className="text-center mt-[100px] text-[20px]">{randomMessage}</p>
      )}
    </div>
  );
};

export default Result;
