import { myPageStore, Prefer } from "../../stores/myPageStore";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/GameCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "../mixAndMatchComponents/MixandMatch.module.css";
import {
  Autoplay,
  Pagination,
  Navigation,
  Thumbs,
  FreeMode,
  EffectCoverflow
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { FaPlusSquare } from "react-icons/fa";

const LikeComponent: React.FC = () => {
  const { data } = myPageStore();
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate("/");
  };


  const getDetailPage = (gameId: number) => {
    // 라엘아 여기서 로그 남겨줘
    navigate(`/detail/${gameId}`);
  };

  if (data.result.preferList.length === 0) {
    return (
      <>
        <div
          style={{
            borderRadius: "10px",
            boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.5)",
            backgroundColor: "#343434",
            height: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={style.getPocketBtn} onClick={handleGoToMain}>
            {/* <FaGamepad size={50} /> */}
            <FaPlusSquare size={50} className={style.neonEffect} />
            <p className={`mt-[10px] mb-[20px] text-lg ${style.neonEffect}`}>
              게임 담으러 가기😉
            </p>
          </div>
          {/* <button className={style.getPocketBtn} onClick={handleGoToMain}>
          담으러 가기
        </button> */}
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ width: "900px", height: "200px" }}>
        <Swiper
          modules={[FreeMode, Autoplay, Pagination, Navigation, Thumbs, EffectCoverflow]}
          effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
          spaceBetween={0}
          slidesPerView={4}
          loop={false}
          navigation={true}
        >
          {data.result.preferList.map((prefer: Prefer, index: number) => (
            <SwiperSlide key={index} style={{ position: "relative" }}>
                <motion.div>
                  <GameCard
                    key={prefer.gameId}
                    gameId={prefer.gameId}
                    imageUrl={prefer.gameHeaderImg}
                    title={prefer.gameName}
                    developer={prefer.gameDeveloper}
                    beforPrice={`₩ ${prefer.gamePriceInitial / 100}`}
                    price={`₩ ${prefer.gamePriceFinal / 100}`} 
                    tagsAll={prefer.tagList}
                    tags={prefer.tagList.filter(tag => tag.codeId === "GEN" && tag.tagName.length < 7).map(tag => tag.tagName)}
                    isPrefer={prefer.isPrefer}
                    likes={prefer.gameLike}
                    onGameClick={getDetailPage}
                  ></GameCard>
                </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default LikeComponent;
