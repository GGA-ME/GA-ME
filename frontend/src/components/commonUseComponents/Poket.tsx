import usePoketStore from '../../stores/poketStore'; // 스토어를 가져옵니다.
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import style from './Poket.module.css';



const Poket: React.FC = () => {
  const cartItems = usePoketStore(state => state.cartItems);
  const { removeItem } = usePoketStore();
  const navigate = useNavigate();

  // 믹스앤매치 페이지로 이동하기 위한 함수
  const navigateToMixAndMatch = () => {
    navigate(`/mixAndMatch`)
    console.log('믹스엔 매치 페이지 이동')
  }

  return (
    <div className='fixed right-3 flex flex-col items-center justify-center h-screen'
      style={{ marginRight: '10px', zIndex: '9999'}}
    >

      {/* 포켓 박스 */}
      <div className={`${style.neonBorder} -translate-y-20 flex flex-col items-center justify-center px-8 rounded-full border-r-2 border-l-2 bg-gray-900 text-white z-40 h-96`}
        style={{ 
          height: '29rem' ,
          marginTop: '150px'
      
        }}>

                {/* Info아이콘 */}
      <section className="fixed top-3 justify-center items-center mb-4"> {/* mb-4는 하단 요소와의 간격 조정 */}
        <div className="group flex justify-center transition-all rounded-full bg-gray-200 p-1">
          <svg viewBox="0 0 320 512" className="w-4 h-4">
            <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path>
          </svg>
          <span className={`absolute opacity-0 -translate-y-5 group-hover:opacity-100 group-hover:-translate-x-5 duration-700 text-sm ${style.bubble}`}>
            <img src={'/Cart.png'} alt="Cart" style={{marginLeft: '10px', marginBottom:'5px'}}/>
            <p> 아이콘을 클릭하여,<br/>
            게임을 2개 이상 추가 후 Mix! <br/>
            선택한 게임과 비슷한 장르의 게임을 찾아보세요!<br/>
            </p>
          </span>
        </div>
      </section>

        {/* 포켓 아이콘 */}
        <div className="w-14 mt-6">
          {cartItems.map((game) => (
            <motion.div key={game.gameId} className="mb-5"
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

        {/* 믹스앤매치 이동 버튼 */}
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