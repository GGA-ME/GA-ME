import React, { useState, useEffect } from 'react';
import Navbar from "../components/commonUseComponents/Navbar";
import Title from "../components/HotTopicComponents/Title";
import SaleButton from "../components/HotTopicComponents/SaleButton";
import NewsButton from "../components/HotTopicComponents/NewsButton";
import NewsList from '../components/HotTopicComponents/NewsList';
import SaleComponent from '../components/HotTopicComponents/SaleComponent';
import useHotTopicStore from "../stores/hotTopicStore";
import Poket from "../components/commonUseComponents/Poket";
const HotTopic: React.FC = () => {
  const [showSale, setShowSale] = useState(true);
  const { newsData,fetchNewsData } = useHotTopicStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchNewsData();
    };
    if(newsData==null){
      fetchData(); // 함수 호출
    }
    
    
  }, []); // 두 번째 매개변수로 빈 배열 전달
  
  const handleNewsButtonClick = () => {
    setShowSale(false);
  };

  const handleSaleButtonClick = () => {
    setShowSale(true); 
  };
  return (
    <>
      <Navbar />
      <div 
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
          <SaleButton onClick={handleSaleButtonClick} />
          <NewsButton onClick={handleNewsButtonClick} />
        </div>
        <div style={{marginTop:'30px',display: 'flex', gap: '20px'}}>
          {!showSale && (
            <NewsList/> 
          )}
          {showSale &&(
              <SaleComponent/>
            )
          }
        </div>
        
      </div>
      {showSale && (
           <Poket />
          )}
      

    </>
  );
}

export default HotTopic;
