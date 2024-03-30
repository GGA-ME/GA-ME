import React from "react";
import useMixAndMatchStore from "../../stores/mixAndMatchStore";
import GameCard from "../commonUseComponents/GameCard";
import style from "./MixandMatch.module.css";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가

const Result: React.FC = () => {
  const { results, loading } = useMixAndMatchStore(); // 로딩 상태 추가
  const navigate = useNavigate(); // useNavigate 인스턴스화

  const gameCardDtoList = results?.gameCardDtoList;

  const handleClickGame = (gameId: number) => {
    navigate(`/detail/${gameId}`);
  };

  return (
    <div>
      {/* 데이터가 로딩되지 않은 경우에만 문구를 표시합니다. */}
      {!loading && !gameCardDtoList && (
        <div>
          <p className="ml-[185px] mt-[30px] text-[30px] font-sejong">
            게임을 조합해서 추천을 받아 보세요😉
          </p>
        </div>
      )}

      {/* 로딩 중인 경우 스피너 표시 */}
      {loading && (
        <div className={`${style.container}`}>
          <img
            src="/MixAndMatch.gif"
            alt="Mix and Match"
            className={`${style.loadingImg}`}
          />
          <div>
            <h1 className={`${style.loadingTitle}`}>
              뚝딱뚝딱 조합 중...{" "}
            </h1>
            <p className={style.loadingSubTitle}> &nbsp; 조금만 기다려주세요 </p>
          </div>
        </div>
      )}

      {/* 로딩이 완료되면 게임 카드 표시 */}
      {!loading && gameCardDtoList && (
        <>
          <p className="ml-[185px] mt-[30px] text-[30px] font-sejong">Match</p>
          <div className={style.box} style={{ marginTop: 0 }}>
            <div className={style.gameList}>
              {gameCardDtoList.map((item, index: number) => (
                <GameCard
                  key={index}
                  gameId={item.gameId}
                  imageUrl={item.gameHeaderImg}
                  title={item.gameName}
                  developer={item.gameDeveloper}
                  price={`₩ ${item.gamePriceFinal}`}
                  beforPrice={`₩ ${item.gamePriceInitial}`}
                  tags={item.tagList
                    .filter((tag) => tag.codeId === "GEN")
                    .map((tag) => tag.tagName)}
                  tagsAll={item.tagList}
                  likes={item.gameLike}
                  isPrefer={item.isPrefer}
                  onGameClick={() => handleClickGame(item.gameId)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
