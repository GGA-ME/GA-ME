import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';
import style from './Banner.module.css'
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';


const games = [
  // Add 6 game information objects here
  { title: 'Game Title 1', imageUrl: '/TestGameImg.jpg', backgroundUrl: '/TestGameImg.jpg' },
  { title: 'Game Title 2', imageUrl: '/TestGameImg2.jpg', backgroundUrl: '/TestGameImg2.jpg' },
  { title: 'Game Title 3', imageUrl: '/TestGameImg.jpg', backgroundUrl: '/TestGameImg.jpg' },
  { title: 'Game Title 4', imageUrl: '/TestGameImg2.jpg', backgroundUrl: '/TestGameImg2.jpg' },
  { title: 'Game Title 5', imageUrl: '/TestGameImg.jpg', backgroundUrl: '/TestGameImg.jpg' },
  { title: 'Game Title 6', imageUrl: '/TestGameImg2.jpg', backgroundUrl: '/TestGameImg2.jpg' },

];

const Banner: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null); // 썸네일 슬라이더의 인스턴스를 저장할 상태
  return (
    <div className={`${style.bannerContainer}`}> {/* 이 div는 Swiper 컨테이너의 전체 크기를 결정합니다. */}
    <div className={`${style.titleContainer} text-2xl`}>
        <h2>인기게임</h2>
      </div>

      <Swiper
      style={{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }}
        className={style.swiper}
        modules={[FreeMode, Autoplay, Pagination, Navigation, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // {...(thumbsSwiper && { thumbs: { swiper: thumbsSwiper } })}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={{ clickable: true }}
      >
        {games.map((game, index) => (
          <SwiperSlide key={index} className={`${style.swiperSlide}`}>
            {/* 블러 처리된 배경을 위한 div */}
            <div 
              className={style.background} 
              style={{ backgroundImage: `url(${game.backgroundUrl})` }}
            ></div>
            {/* 실제 보여질 이미지 */}
            <div className={`${style.imageContainer} mt-16`}>
              <img src={game.imageUrl} alt={game.title} className={style.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
      // onSwiper={setThumbsSwiper} => 왜안돼?ㅠㅠㅠㅠㅠ
      loop={true}
      spaceBetween={10}
      slidesPerView={6}
      watchSlidesProgress={true}
      modules={[FreeMode, Navigation, Thumbs]}
      >
        {games.map((game, index) => (
          <SwiperSlide key={index} >
            {/* 실제 보여질 이미지 */}
              <img  className={`${style.Thumb}`} src={game.imageUrl} alt={game.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;