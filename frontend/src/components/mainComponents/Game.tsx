import GameCard from '../commonUseComponents/GameCard'
import { motion } from 'framer-motion'

function Game() {

  const sample = [{
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }, {
    title: "Elden Ring",
    price: 303000, // Assuming you meant 303,000. If it was intended to be 30,3000 (which is unconventional), please adjust accordingly.
    imageUrl: "/Game.gif"
  }];

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
        {sample.map((game, index) =>(
          <motion.li key={index} className="list-none"
          variants={{
            hidden: { x: -60, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
          }}
        >
          <GameCard
            key={index}
            imageUrl="/TestGameImg.jpg"
            title={game.title}
            price={`₩ ${game.price}`}
            tags={['액션',' 슈팅', '개그','추리', '공포']}
            likes={34}
          />
        </motion.li>
        ))}
    </motion.ul>
  );
}
export default Game;