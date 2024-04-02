import { useEffect } from 'react'
import useStoreMain from "../../stores/mainStore";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, FreeMode, EffectCoverflow } from 'swiper/modules';
import { motion } from "framer-motion";
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
      <div className="absolute ml-48 top-1 p-4 z-10 text-2xl"> {/* 베너 타이틀 컨테이너 */}
        <h1 className={`${style.famousGame}`}>인기게임</h1>
      </div>

      {/* 베너 메인 */}
      <Swiper
        className={`${style.swiperCustom} w-full h-full`}
        modules={[FreeMode, Autoplay, Pagination, Navigation, EffectCoverflow]}
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
        slidesPerView={2}
        spaceBetween={0}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slideToClickedSlide={true} // 클릭한 슬라이드로 이동
      >
{bannerData?.result.map((banner: Banner, index: number) => (
  <SwiperSlide key={index} className="relative h-full">
    <div className="absolute w-full h-full bg-cover bg-center filter blur-md z-[-1] before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-50" style={{ backgroundImage: `url(${banner.gameHeaderImg})` }}></div>
    <div className="relative w-full h-5/6 flex justify-center items-start mt-16">
      <img src={banner.gameHeaderImg} alt={banner.gameName} className="mb-8 w-9/10 h-80 object-fill rounded-xl" />
      <motion.div
  className={`${style.detailButton} absolute bottom-10 right-10 transform bg-transparent backdrop-blur-md text-white font-bold py-2 px-4 rounded cursor-pointer`}
  initial={{ opacity: 0.5 }} // 초기 opacity 값을 0.5로 설정
  whileHover={{ scale: 1.2, opacity: 1 }} // 호버 시 scale을 1.2로, opacity를 1로 변경
  transition={{ duration: 0.3 }} // 애니메이션 지속 시간을 0.3초로 설정
  onClick={() => handleClickBanner(banner.gameId)}
>
  자세히 보기
</motion.div>
    </div>
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
