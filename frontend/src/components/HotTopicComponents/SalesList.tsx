import { motion } from 'framer-motion';
import GameCard from '../commonUseComponents/GameCard';
import useHotTopicStore from "../../stores/hotTopicStore";
import { AxiosError } from 'axios';

// SaleCardProps 타입 정의
interface SaleCardProps {
  salePercent?:number;
  cardDtoList: {
    gameId: number;
    gameName: string;
    gameHeaderImg: string;
    gamePriceFinal: number;
    gamePriceInitial: number;
    gameDeveloper: string;
    gameDiscountPercent: number;
    gameLike: number;
    isPrefer: boolean;
    tagList?: Array<{ codeId: string; tagId:number; tagName: string }> | null; // tagList가 null일 수도 있음을 명시
  }[];
}

const SalesList: React.FC<SaleCardProps> = ({ cardDtoList }) => {
  console.log(cardDtoList);
  const { loading, error } = useHotTopicStore(); // saleData를 사용하지 않으므로 해당 부분 제거
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const axiosError = error as AxiosError;
    return <div>Error: {axiosError.message}</div>;
  }

  return (
    <motion.ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      }}
      initial="hidden"
      animate="visible"
    >
      {cardDtoList.map((game, index) => (
        <motion.li key={index} className="list-none"
          variants={{
            hidden: { x: -60, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
          }}
        >
    <GameCard
      gameId={game.gameId}
      imageUrl={game.gameHeaderImg}
      title={game.gameName}
      price={`₩ ${game.gamePriceFinal}`}
      tagsAll={game.tagList}
      tags={game.tagList ? game.tagList.filter(tag => tag.codeId === "GEN").map(tag => tag.tagName) : []}
      likes={game.gameLike}
      // 젠킨슨 오류 해결을 위한 임시 코드
      onGameClick={() => console.log(`Clicked on game ${game.gameId}`)} // 여기에 실제 로직을 구현
    />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SalesList;
