import { useState, useEffect } from 'react'
import useStoreMain from "../../stores/mainStore";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Autoplay, Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';
import style from './Banner.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';


interface Banner {
  gameId: number;
  gameName: string;
  gameHeaderImg: string;
  gamePriceInitial: number;
  gamePriceFinal: number;
  gameDeveloper: string;
  gameLike: number | null;
  isPrefer: boolean;
  tagList: Array<{ codeId: string; tagId: number; tagName: string }>;
}


const Banner: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const { bannerData, mainBanner } = useStoreMain();
  const navigate = useNavigate(); // useNavigate 인스턴스화

  useEffect(() => {
    mainBanner(); // 마운트시 데이터 가져오기
  }, []);

  const handleClickBanner = (gameId: number) => {
    navigate(`/detail/${gameId}`)
    console.log('디테일페이지 이동')
  }

  return (
    <div className="relative w-full overflow-hidden h-60vw"> {/* bannerContainer */}
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
        {bannerData?.result.map((banner: Banner, index: number) => (
          <SwiperSlide key={index} className="relative h-full">
            <div className="absolute w-full h-full bg-cover bg-center filter blur-md z-[-1] before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-50" style={{ backgroundImage: `url(${banner.gameHeaderImg})` }}></div>
            <div className="relative w-full h-3/4 flex justify-center items-start mt-16" >
              <img src={banner.gameHeaderImg} alt={banner.gameName} className="w-9/10 h-80 object-fill rounded-sm cursor-pointer" onClick={() => handleClickBanner(banner.gameId)} />
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
        {bannerData?.result.map((banner: Banner, index: number) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img src={banner.gameHeaderImg} alt={banner.gameName} className="w-full h-auto mx-0 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
