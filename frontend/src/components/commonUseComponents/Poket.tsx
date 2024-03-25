import usePoketStore from '../../stores/poketStore'; // 스토어를 가져옵니다.
import { motion } from 'framer-motion'
import style from './Poket.module.css';



const Poket: React.FC = () => {
  const cartItems = usePoketStore(state => state.cartItems);
  const { removeItem } = usePoketStore();


  return (
<div className={`${style.neonBorder} fixed top-0 right-14 flex flex-col items-center justify-center px-8 h-screen border-r-2 border-l-2 bg-gray-900 text-white z-40`}>
      <div className="w-14">
        {cartItems.map((game, index) => (
          <motion.div key={game.gameId} className="mb-6"
            onClick={() => removeItem(game.gameId)}
            style={{ cursor: 'pointer' }}
            transition={{ type: "spring", stiffness: 100 }}
            initial={{ scale: 0 }} // 시작 상태에서는 스케일을 0으로 설정
            animate={{ scale: 1 }} // 애니메이션 끝나는 지점에서 스케일을 1로 설정
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{
              scale: 0.8,
              borderRadius: "100%"
            }}>
            <img src={game.imageUrl || '기본 아이콘 경로'} alt={game.title} className="w-14 h-14 rounded-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Poket;