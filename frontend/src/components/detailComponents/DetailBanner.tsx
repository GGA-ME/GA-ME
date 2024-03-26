import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './DetailBanner.module.css'; // CSS import

const DetailBanner: React.FC = () => {
  const [swiper, setSwiper] = useState(null);

  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // ...더 많은 이미지
  ];
  let screenshots: {
    id: number;
    path_full: string;
    path_thumbnail: string;
  }[] = []; // 이 변수를 사용할 예정이라면 빈 배열이나 실제 데이터로 초기화합니다.
  screenshots = [{"id": 0, "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/1070707/ss_de412368371c53ee62e4d13f398699db7a23e050.1920x1080.jpg?t=1561395546", "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/1070707/ss_de412368371c53ee62e4d13f398699db7a23e050.600x338.jpg?t=1561395546"}, {"id": 1, "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/1070707/ss_37211374c784ff73b4cdf7380fda67a821c38861.1920x1080.jpg?t=1561395546", "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/1070707/ss_37211374c784ff73b4cdf7380fda67a821c38861.600x338.jpg?t=1561395546"}, {"id": 2, "path_full": "https://cdn.akamai.steamstatic.com/steam/apps/1070707/ss_da3b9ac402a8fa111dac95c07e4df32e4a1fa0c9.1920x1080.jpg?t=1561395546", "path_thumbnail": "https://cdn.akamai.steamstatic.com/steam/apps/1070707/ss_da3b9ac402a8fa111dac95c07e4df32e4a1fa0c9.600x338.jpg?t=1561395546"}]
  return (
    <div>
      <Swiper
        className="mainSwiper"
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="thumbnailSwiper"
        onSlideChange={(swiper) => swiper.slideTo(swiper.activeIndex)}
        spaceBetween={10}
        slidesPerView={5}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              onClick={() => swiper.slideTo(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DetailBanner;
