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
  }, [mainBanner]);

  // 해당 게임 디테일 페이지로 이동
  const handleClickBanner = (gameId: number) => {
    navigate(`/detail/${gameId}`)
    console.log('디테일페이지 이동')
  }
  // 파일이 없는경우를 정확히 검사
  if (bannerData && bannerData.result && bannerData.result.length > 0) {
  return (
    <div className="relative w-full overflow-hidden h-60vw"> {/* 베너 컨테이너 */}
      <div className="absolute top-0 left-0 p-4 z-10 text-2xl"> {/* 베너 타이틀 컨테이너 */}
        <h1 className={`${style.famousGame}`}>인기게임</h1>
      </div>

      {/* 베너 메인 */}
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
              <img src={banner.gameHeaderImg} alt={banner.gameName} className="mb-8 w-9/10 h-80 object-fill rounded-xl cursor-pointer" onClick={() => handleClickBanner(banner.gameId)} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 베너 thumbs */}
      <Swiper
        className="mySwiper"
        modules={[FreeMode, Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        slidesPerGroup={1} // 한 번에 넘길 슬라이드 수를 줄임

        watchSlidesProgress={true}
      >
        {bannerData?.result.map((banner: Banner, index: number) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <img src={banner.gameHeaderImg} alt={banner.gameName} className="w-full h-auto mx-0 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 
// else {
//   // 로딩 상태나 다른 대체 컨텐츠를 표시할 수 있습니다.
//   return <div>Loading...</div>;
// }
};

export default Banner;
