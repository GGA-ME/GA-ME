import GameCard from '../commonUseComponents/GameCard'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import useStoreMain from "../../stores/mainStore"
function Game() {

  // 스토어 정리
  const { data, loading, error, fetchData, userId, codeId, tagId, size, page } = useStoreMain();

  useEffect(() => {
    fetchData() // 컴포넌트 마운트 시 데이터를 가져옵니다.
    console.log(data)
  }, [fetchData, page]); // fetchData가 변경될 때마다 호출됩니다.

  // 데이터 로딩 중이면 로딩 인디케이터를 표시합니다.
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러가 있으면 에러 메시지를 표시합니다.
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // data 또는 data.result가 없는 경우 추가 처리를 할 수 있습니다.
if (!data || !data.result) {
  return <div>No data available</div>;
}

  const allResult = data.result
  console.log(allResult);



  return (
    <motion.ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
    "
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } } // 각 자식 컴포넌트 사이의 지연시간을 설정합니다.
      }}
      initial="hidden" // 초기 상태를 hidden으로 설정
      animate="visible" // 애니메이션 상태를 visible로 설정하여 애니메이션을 시작합니다.
    >
      {allResult.map((game, index) => (
        <motion.li key={index} className="list-none"
          variants={{
            hidden: { x: -60, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
          }}
        >
          <GameCard
            key={index}
            imageUrl={game.gameHeaderImg}
            title={game.gameName}
            price={`₩ ${game.gamePriceFinal}`}
            tags={game.tagList.filter(tag => tag.codeId === "GEN").map(tag => tag.tagName)}
            likes={34}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
export default Game;