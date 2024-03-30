import detailStore, { Prefer } from "../../stores/myPageStore";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/SimpleGameCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

const LikeComponent: React.FC = () => {
  const { data } = detailStore();
  const navigate = useNavigate();

  const getDetailPage = (gameId: number) => {
    // 라엘아 여기서 로그 남겨줘
    navigate(`/detail/${gameId}`);
  };

  return (
    <>
      <Swiper
        modules={[FreeMode, Autoplay, Pagination, Navigation, Thumbs]}
        spaceBetween={0}
        slidesPerView={4}
        loop={true}
        navigation={true}
        style={{ width: "900px" }}
        // pagination={{ clickable: true }}
      >
        {data.result.preferList.map((prefer: Prefer, index: number) => (
          <SwiperSlide key={index} style={{ position: "relative" }}>
            <motion.div>
              <div>
                <GameCard
                  gameId={prefer.gameId}
                  imageUrl={prefer.gameHeaderImg}
                  title={
                    <>
                      <span className="text-gray-400"  onClick={() => getDetailPage(prefer.gameId)}>{prefer.gameName}</span>
                      <br />
                      <br />
                      <span className="text-slate-50">{prefer.gameDeveloper}</span>
                    </>
                  }
                ></GameCard>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LikeComponent;
