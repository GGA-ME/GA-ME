import React from 'react'
import mixAndMatchStore from '../../stores/mixAndMatchStore' 
import GameCard from '../commonUseComponents/GameCard';

const Result: React.FC = () => {

    // mixAndMatchStore에서  추천게임 검색 결과 가져오기
    const {data} = mixAndMatchStore();
    const gameCardDtoList = data.result?.gameCardDtoList ?? [];

    return(
        <>
        <h1>검색 추천 결과</h1>
        <div>
            {gameCardDtoList.map((gameCardDto) =>(
                <GameCard 
                    key={gameCardDto.gameId}
                    imageUrl={gameCardDto.gameHeaderImg}
                    title={gameCardDto.gameName}
                    price={gameCardDto.gamePriceFinal.toLocaleString()}
                    tags={gameCardDto.tagList ? gagameCardDtome.tagList.map((tag) => tag.tagName) : []}
                    likes={0} // likes값이 제공되지 않으므로 예시값 0을 사용
                />
            ))}
        </div>
        </>
    )
}

export default Result