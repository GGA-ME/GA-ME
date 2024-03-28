import React from 'react'
import useMixAndMatchStore from '../../stores/mixAndMatchStore'
import GameCard from '../commonUseComponents/GameCard';
import style from "./MixandMatch.module.css"

const Result: React.FC = () => {

    const {results} = useMixAndMatchStore();

    const gameCardDtoList = results?.gameCardDtoList;

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
            onGameClick={() => console.log("temp onGameClick: ", item.gameName)}
          />
        ))}
            
        </div>
        </div>
    )
}

export default Result