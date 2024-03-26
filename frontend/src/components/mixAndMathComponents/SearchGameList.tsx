import React from "react";
import usePoketStore from "../../stores/poketStore";

// TODO: 1. pocket에 담긴 게임 가져오기 DONE
// TODO: 2. 가져온 포켓게임 보여주기
// TODO: 3. MixAndMatchStore에 fetchData axios 만들기
// TODO: 4. 조합하기 버튼 만들기*(axios) 연결
// TODO: 5. 조합하기 버튼 onClick handle함수 만들기

const SearchGameList: React.FC = () => {

  const cartItems =usePoketStore((state)=>state.cartItems);
  console.log("1. getCartItems: ", cartItems)


  return (
   <div></div>
  );
};

export default SearchGameList;
