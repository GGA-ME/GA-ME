import React from "react";
import usePoketStore from "../../stores/poketStore";
import GameCard from "../commonUseComponents/GameCard";
import style from "./MixandMatch.module.css";
import useUserStore from "../../stores/userStore";
import useMixAndMatchStore from "../../stores/mixAndMatchStore";
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가



const SearchGameList: React.FC = () => {
  const cartItems = usePoketStore((state) => state.cartItems);

  // axios 요청을 위한 requestData 생성
  const userId = useUserStore().user?.userId;

  const gameIdAndTagDtoList = [];
  for (const item of cartItems) {
    gameIdAndTagDtoList.push({
      gameId: item.gameId,
      tagList: item.tagsAll,
    });
  }

  const requestData = {
    userId,
    gameIdAndTagDtoList
  };

  const { fetchData } = useMixAndMatchStore();

  const HandleOnClick =  () => {
    fetchData(requestData);
  };

  const navigate = useNavigate(); // useNavigate 인스턴스화

  const handleClickGame = (gameId:number) => {
    navigate(`/detail/${gameId}`)
  }

  return (
    <div className={style.box}>
      <div>
        {cartItems.map((item, index: number) => (
          <GameCard
            key={index}
            gameId={item.gameId}
            imageUrl={item.imageUrl}
            title={item.title}
            price={`₩ ${item.price}`}
            tags={item.tagsAll?.filter(tag => tag.codeId === "GEN").map(tag => tag.tagName) ?? []}
            tagsAll={item.tagsAll}
            likes={0} // 임시 값
            onGameClick={handleClickGame}
          />
        ))}
      </div>
      <button className={style.topicBtn} onClick={HandleOnClick}> 조합하기 </button>
    </div>
  );
};

export default SearchGameList;
