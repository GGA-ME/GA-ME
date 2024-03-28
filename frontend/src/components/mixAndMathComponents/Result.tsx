import React from 'react'
import useMixAndMatchStore from '../../stores/mixAndMatchStore'
import GameCard from '../commonUseComponents/GameCard';
import style from "./MixandMatch.module.css"
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가


const Result: React.FC = () => {

    const {results} = useMixAndMatchStore();
    const navigate = useNavigate(); // useNavigate 인스턴스화

    const gameCardDtoList = results?.gameCardDtoList;

    const handleClickGame = (gameId:number) => {
        navigate(`/detail/${gameId}`)
      }

    return(
        <div className={style.box}>
        <h1>검색 추천 결과</h1>
        <div>
        {gameCardDtoList?.map((item, index: number) => (
            <GameCard
            key={index}
            gameId={item.gameId}
            imageUrl={item.gameHeaderImg}
            title={item.gameName}
            price={`₩ ${item.gamePriceFinal}`}
            tags={item.tagList.filter(tag => tag.codeId === "GEN").map(tag => tag.tagName)}
            tagsAll={item.tagList}
            likes={0} // 임시 값
            onGameClick={handleClickGame}
          />
        ))}
            
        </div>
        </div>
    )
}

export default Result