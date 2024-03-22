import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Autoplay, Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';
import style from './Banner.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';


interface Game {
  title: string;
  imageUrl: string;
  backgroundUrl: string;
}

const games: Game[] = [
  // Add 6 game information objects here
  { title: 'Game Title 1', imageUrl: '/TestGameImg.jpg', backgroundUrl: '/TestGameImg.jpg' },
  { title: 'Game Title 2', imageUrl: '/TestGameImg2.jpg', backgroundUrl: '/TestGameImg2.jpg' },
  { title: 'Game Title 3', imageUrl: '/TestGameImg.jpg', backgroundUrl: '/TestGameImg.jpg' },
  { title: 'Game Title 4', imageUrl: '/TestGameImg2.jpg', backgroundUrl: '/TestGameImg2.jpg' },
  { title: 'Game Title 5', imageUrl: '/TestGameImg.jpg', backgroundUrl: '/TestGameImg.jpg' },
  { title: 'Game Title 6', imageUrl: '/TestGameImg2.jpg', backgroundUrl: '/TestGameImg2.jpg' },

];

const Banner: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  return (
    <div className="relative w-full overflow-hidden h-40vw"> {/* bannerContainer */}
      <div className="absolute top-0 left-0 p-4 z-10 text-2xl"> {/* titleContainer */}
        <h2>인기게임</h2>
      </div>

      <Swiper
        className={`${style.swiperCustom} w-full h-full`}
        modules={[FreeMode, Autoplay, Pagination, Navigation, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // pagination={{ clickable: true }}
        {...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {})}
      >
        {games.map((game, index) => (
          <SwiperSlide key={index} className="relative h-full">
            <div className="absolute w-full h-full bg-cover bg-center filter blur-md z-[-1]" style={{ backgroundImage: `url(${game.backgroundUrl})` }}></div>
            <div className="relative w-full h-3/4 flex justify-center items-start mt-16">
              <img src={game.imageUrl} alt={game.title} className="w-9/10 h-80 object-fill rounded-xl" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {games.map((game, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img src={game.imageUrl} alt={game.title} className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
