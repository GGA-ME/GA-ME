import detailStore, { Prefer } from "../../stores/myPageStore";
import { motion } from "framer-motion";
import GameCard from "../commonUseComponents/SimpleGameCard";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import {
  Autoplay,
  Pagination,
  Navigation,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { useState } from "react";

const LikeComponent: React.FC = () => {
  const [thumbsSwiper] = useState<SwiperClass | null>(null);
  const { data } = detailStore();
  const navigate = useNavigate();

  const getDetailPage = (gameId: number) => {
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
        style={{maxWidth: '1000px', margin: '10px'}}
        // pagination={{ clickable: true }}
        {...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {})}
      >
        {data.result.preferList.map((prefer: Prefer, index: number) => (
          <SwiperSlide className="relative h-full width-50" key={index}>
            <motion.div onClick={() => getDetailPage(prefer.gameId)}>
              <GameCard
                gameId={prefer.gameId}
                imageUrl={prefer.gameHeaderImg}
                title={
                  <>
                    <span className="text-gray-400">{prefer.gameName}</span>
                    <br />
                    <br />
                    <span className="text-slate-50">
                      {prefer.gameDeveloper}
                    </span>
                  </>
                }
              ></GameCard>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LikeComponent;
