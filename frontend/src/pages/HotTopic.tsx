import React, { useState, useEffect } from 'react';
import Navbar from "../components/commonUseComponents/Navbar";
import Title from "../components/HotTopicComponents/Title";
import SaleButton from "../components/HotTopicComponents/SaleButton";
import NewsButton from "../components/HotTopicComponents/NewsButton";
import NewsList from '../components/HotTopicComponents/NewsList';
import SaleComponent from '../components/HotTopicComponents/SaleComponent';
import useHotTopicStore from "../stores/hotTopicStore";

const HotTopic: React.FC = () => {
  const [showNews, setShowNews] = useState(true);
  const { fetchNewsData } = useHotTopicStore();

  useEffect(() => {
    fetchNewsData(); // 초기 렌더링 시에만 실행됨
  }, []); 

  const handleNewsButtonClick = () => {
    setShowNews(true);
  };

  const handleSaleButtonClick = () => {
    setShowNews(false); // 세일 버튼을 클릭하면 NewsCard를 숨김
  };
  
  return (
    <>
      <Navbar />
      <div className="w-full" 
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'scroll', // 스크롤이 필요한 경우만 스크롤 가능하도록 설정
          paddingLeft: '350px'
        }}>
        <Title/>
        <div style={{marginTop:'20px',display: 'flex', gap: '20px'}}>
          <NewsButton onClick={handleNewsButtonClick} />
          <SaleButton onClick={handleSaleButtonClick} />
        </div>
        <div style={{marginTop:'30px',display: 'flex', gap: '20px'}}>
          {showNews && (
            <NewsList/>
          )}
          {
            !showNews &&(
              <SaleComponent/>
            )
          }
        </div>
      </div>
    </>
  );
}

export default HotTopic;
