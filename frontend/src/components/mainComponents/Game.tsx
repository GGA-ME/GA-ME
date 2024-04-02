// 작성자 : 장현욱

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 추가
import GameCard from '../commonUseComponents/GameCard';
import useStoreMain from "../../stores/mainStore";
import { AxiosError } from 'axios';
import LoadingComponent from '../commonUseComponents/Loading';import style from './Game.module.css'

// 사용 스토어의 구조를 기반으로 하는 구조
interface Game {
  gameId: number;
  gameName: string;
  gameHeaderImg: string;
  gamePriceInitial: number
  gamePriceFinal: number;
  gameDeveloper: string;
  tagList: Array<{ codeId: string; tagId:number; tagName: string }>;
  isPrefer: boolean;
  gameLike: number | null;
}

const GameComponent: React.FC = () => {
  const { data, loading, error, fetchMainData, page, setPage } = useStoreMain();
  const navigate = useNavigate(); // useNavigate 인스턴스화

  useEffect(() => {
    fetchMainData(); // 마운트시 데이터 가져오기
  }, [fetchMainData, page]); // page가 변경될 때마다 데이터를 불러옵니다.

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    const axiosError = error as AxiosError;
    return <div>Error: {axiosError.message}</div>;
  }

  if (!data || !data.result.length) {
    return <div>No data available</div>;
  }

  const handleClickGame = (gameId:number) => {
    navigate(`/detail/${gameId}`)
    console.log('디테일페이지 이동')
  }

  const handleNextPage = () => {
    setPage(page + 1); // 다음 페이지로 이동
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1); // 이전 페이지로 이동 (1보다 클 때만)
  };

  return (
    <>
    <motion.ul className="grid gap-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      initial="hidden"
      animate="visible"
    >
      {data.result.map((game: Game, index: number) => (
        <motion.li key={index} className="list-none"
          variants={{
            hidden: { x: -60, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.1 } }
          }}
        >
          <GameCard
            key={game.gameId}
            gameId={game.gameId}
            imageUrl={game.gameHeaderImg}
            title={game.gameName}
            developer={game.gameDeveloper}
            beforPrice={`₩ ${game.gamePriceInitial / 100}`}
            price={`₩ ${game.gamePriceFinal / 100}`}
            tagsAll={game.tagList}
            tags={game.tagList.filter(tag => tag.codeId === "GEN" && tag.tagName.length < 7).map(tag => tag.tagName)}
            isPrefer={game.isPrefer}
            likes={game.gameLike}
            onGameClick={handleClickGame} // 디테일 페이지 이동
            />
        </motion.li>
      ))}
    </motion.ul>

    <div className={`${style.container} p-7 flex justify-center items-start`}>
    <div className={`${style.pane}`}>
        <button className={`${style.label}`} onClick={handlePrevPage} disabled={page <= 1}>
            <span> 이전 </span>
            <input id="left" className={`${style.input}`} name="radio" type="radio"/>
        </button>
        <label className={`${style.label}`}>
            <span>{page}</span>
            <input id="middle" className={`${style.input}`} defaultChecked={true} name="radio" type="radio"/>
        </label>
        <button className={`${style.label}`} onClick={handleNextPage}>
            <span> 다음 </span>
            <input id="right" className={`${style.input}`} name="radio" type="radio"/>
        </button>
        <span className={`${style.selection}`}></span>
    </div>
</div>
          {/* <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
          <span>{page}</span>
          <button onClick={handleNextPage}>Next</button>
        </div> */}
        </>
  );
};

export default GameComponent;
