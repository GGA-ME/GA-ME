// 장현욱

import { motion } from 'framer-motion'
import { useState } from 'react';
import usePoketStore from '../../stores/poketStore';
import useStoreLike from '../../stores/likeStore'
import style from './GameCard.module.css'

interface TagDto {
  codeId: string
  tagId: number
  tagName: string
}

// 타입스크립트 타입 프롭받을 타입 정의
export interface GameCardProps {
  gameId: number;
  imageUrl: string;
  title: string;
  price: string;
  tagsAll?: TagDto[] | null;
  tags: string[];
  likes: number | null;
  isPrefer: boolean; // 추가
  onGameClick: (gameId: number) => void;
}


// 타입스크립트식 선언
const GameCard: React.FC<GameCardProps> = ({ gameId, imageUrl, title, price, tagsAll, tags, likes, isPrefer, onGameClick }) => {

  const [isHovered, setIsHovered] = useState(false);
  const { cartItems, addItem, removeItem } = usePoketStore();
  const [showAlert, setShowAlert] = useState(false); // 경고 메시지 상태 추가
  const { likeGame, unlikeGame } = useStoreLike();

  // 카트 안에 데이터가 있는지 확인
  const isInCart = cartItems.some(item => item.gameId === gameId);


  // 포켓에 넣는 핸들러
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isInCart) {
      removeItem(gameId);
    } else {
      if (cartItems.length >= 5) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
      addItem({ gameId, imageUrl, title, price, tagsAll });
    }
  };

  // 좋아요와 좋아요 취소 핸들러
  const handleLikeToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 이벤트 버블링 중지
    if (isPrefer) {
      await unlikeGame(); // 좋아요 취소 요청
    } else {
      await likeGame(); // 좋아요 요청
    }
  };

  const hoverEffects = {
    scale: [1, 1.1], // 호버시 크기 설정
    transition: { duration: 0.3 },
  };

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: 'none' },
    visible: { opacity: 1, backdropFilter: 'blur(5px)' },
  };



  return (
    <>
      <motion.div
        className={`${style.card} w-48 m-2 rounded overflow-hidden text-white text-center relative cursor-pointer`}
        whileHover={hoverEffects}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onGameClick(gameId)}
      >
        <div className={`${style.card} w-48 rounded overflow-hidden text-white text-center`}>
          <img src={imageUrl} alt={title} className="w-full" />
          <div className="p-2">
            <h3 className="text-base">{title}</h3>
            <p className="text-xs">{price}</p>
          </div>
        </div>      {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-2"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex justify-center items-center space-x-2">
              {/* 좋아요 버튼 */}
              <motion.button className="rounded-full p-2" onClick={handleLikeToggle}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{
                  scale: 0.8,
                  // rotate: -90,
                  borderRadius: "100%"
                }} >
                <img src={isPrefer ? '/OnLike':'/Like.png'} alt={'Like'} ></img>
              </motion.button>

              {/* 포켓에담기 버튼 */}
              <motion.button
                className={`rounded-full`} // 갈색 배경 클래스 조건부 적용
                onClick={handleClick}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{
                  scale: 0.8,
                  borderRadius: "100%",
                }}
              >
                <img src={isInCart ? '/OnCart.png' : '/Cart.png'} alt="Cart" />
              </motion.button>

              {/* 관심없음 버튼 */}
              <motion.button className="rounded-full p-2" onClick={handleLikeToggle}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{
                  scale: 0.8,
                  // rotate: -90,
                  borderRadius: "100%"
                }} >
                <img src={'/NotLike.png'} alt={'NotLike'}></img>
              </motion.button>

            </div>
            <div className="flex justify-center items-center">
              {/* Tag 리스트 컨테이너 */}
              <div >
                {tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-black bg-opacity-50 rounded px-2 py-1 text-xs font-semibold mx-1 inline-block">{`#${tag}`}
                  </span>))}
              </div>
            </div>
            <div className={`flex justify-center items-center mb-2`}>
              {/* Likes */}
              <span className={`${style.neonNormal}`}>{`♥ : ${likes}`}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
      {/* 카트에 5개 이상 담을시 alert */}
      {showAlert && (
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded`} role="alert">
          <strong className="font-bold">GA:ME포켓에는 최대 5개까지만 담을수 있어요!</strong>
          <span className="block sm:inline"></span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
      )}
    </>
  );
};

export default GameCard;