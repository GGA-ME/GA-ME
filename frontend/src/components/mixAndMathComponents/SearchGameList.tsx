import React from "react";
import usePoketStore from "../../stores/poketStore";
import GameCard from "../commonUseComponents/GameCard";
import style from "./MixandMatch.module.css";
import useUserStore from "../../stores/userStore";
import useMixAndMatchStore from "../../stores/mixAndMatchStore";

// TODO: 1. pocket에 담긴 게임 가져오기 DONE
// TODO: 2. 가져온 포켓게임 보여주기 DONE
// TODO: 3. MixAndMatchStore에 fetchData axios 만들기 DONE
// TODO: 4. 조합하기 버튼 만들기(axios) 연결
// TODO: 5. 조합하기 버튼 onClick handle함수 만들기


const SearchGameList: React.FC = () => {
  const cartItems = usePoketStore((state) => state.cartItems);
  console.log("1. getCartItems: ", cartItems);

  // axios 요청을 위한 requestData 생성
  const userId = useUserStore().user?.userId;
  const gameIdAndTagDtoList = [];
  for (const item of cartItems) {
    gameIdAndTagDtoList.push({
      gameId: item.gameId,
      tagList: item.tags,
    });
  }
  const requestData = {
    userId,
    gameIdAndTagDtoList,
  };

  const { results, fetchData } = useMixAndMatchStore();

  const HandleOnClick = () => {
    fetchData(requestData);
    console.log("onclick:::", results);
  };

  return (
    <div className={style.box}>
      <div>
        {cartItems.map((item, index: number) => (
          <GameCard
            key={index}
            gameId={item.gameId}
            imageUrl={item.imageUrl}
            title={item.title}
            price={item.price}
            tags={item.tags}
            likes={0} // 임시 값
            onGameClick={() => console.log("temp onGameClick: ", item.title)}
          />
        ))}
      </div>
      <button onClick={HandleOnClick}> 조합하기 </button>
    </div>
  );
};

export default SearchGameList;
