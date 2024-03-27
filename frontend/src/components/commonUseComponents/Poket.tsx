import usePoketStore from '../../stores/poketStore'; // 스토어를 가져옵니다.
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import style from './Poket.module.css';



const Poket: React.FC = () => {
  const cartItems = usePoketStore(state => state.cartItems);
  const { removeItem } = usePoketStore();
  const navigate = useNavigate();

  const navigateToMixAndMatch = () => {
    navigate(`/mixAndMatch`)
    console.log('믹스엔 매치 페이지 이동')
  }

  return (
    <div className='fixed right-5 flex flex-col items-center justify-center h-screen'>
      <div className={`${style.neonBorder} -translate-y-20 flex flex-col items-center justify-center px-8 mt-60 rounded-full border-r-2 border-l-2 bg-gray-900 text-white z-40 h-96`}
        style={{ height: '28rem' }}>
        <div className="w-14">
          {cartItems.map((game) => (
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
      <div className={`${style.lightButton}`} onClick={navigateToMixAndMatch}>
        <button className={`${style.bt}`}>
          <div className={`${style.lightHolder}`}>
            <div className={`${style.dot}`}></div>
            <div className={`${style.light}`}></div>
          </div>
          <div className={`${style.buttonHolder}`}>
          <img src="/MixAndMatch.gif" alt="Mix and Match" />
          <p>Mix</p>
          </div>
        </button>
      </div>

    </div>
  );
}

export default Poket;