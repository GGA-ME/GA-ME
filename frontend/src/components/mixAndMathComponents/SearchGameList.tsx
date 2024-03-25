import React from "react";
import GameCard from "../commonUseComponents/GameCard";

// 사용 스토어의 구조를 기반으로 하는 구조
interface Game {
  gameId: number;
  gameName: string;
  gameHeaderImg: string;
  gamePriceFinal: number;
  // 각 태그를 기준으로 각 태그 및 이름을 가진 경우 선언방법
  tagList: Array<{ codeId: string; tagName: string }>;
}

const games: Game[] = [
  {
    gameId: 1,
    gameName: "The Witcher 3: Wild Hunt",
    gameHeaderImg: "witcher3.jpg",
    gamePriceFinal: 29.99,
    tagList: [
      { codeId: "RPG", tagName: "Role-playing Game" },
      { codeId: "OpenWorld", tagName: "Open World" },
      { codeId: "Fantasy", tagName: "Fantasy" },
    ],
  },
  {
    gameId: 2,
    gameName: "Red Dead Redemption 2",
    gameHeaderImg: "rdr2.jpg",
    gamePriceFinal: 39.99,
    tagList: [
      { codeId: "Action", tagName: "Action" },
      { codeId: "Adventure", tagName: "Adventure" },
      { codeId: "OpenWorld", tagName: "Open World" },
    ],
  },
  {
    gameId: 3,
    gameName: "The Legend of Zelda: Breath of the Wild",
    gameHeaderImg: "zelda.jpg",
    gamePriceFinal: 49.99,
    tagList: [
      { codeId: "Action", tagName: "Action" },
      { codeId: "Adventure", tagName: "Adventure" },
      { codeId: "OpenWorld", tagName: "Open World" },
      { codeId: "Fantasy", tagName: "Fantasy" },
    ],
  },
];

// dummy data for test end

interface SearchGameListProps {
  handleCombination: () => Promise<any>; // handleCombination 함수의 타입 정의
}


const SearchGameList: React.FC<SearchGameListProps> = ({ handleCombination }) => {

  const handleClick = async () => {
    try {
      console.log("handleClick run! in SearchGameList")
      const result = await handleCombination(); // handleCombination 함수 호출
      console.log("Combination result:", result);
    } catch (error) {
      console.error("Error occurred while handling combination:", error);
    }
  };



  return (
    <>
    <div>
      {games.map((game: Game, index: number) => {
        return (
          <GameCard
            key={index}
            imageUrl={`./TestGameImg.jpg`}
            title={game.gameName}
            price={`₩ ${game.gamePriceFinal}`}
            tags={game.tagList.map((tag) => tag.tagName)}
            likes={34}
          />
        );
      })}
      </div>
      <button onClick={handleClick}>조합하기</button>
    </>
  );
};

export default SearchGameList;
