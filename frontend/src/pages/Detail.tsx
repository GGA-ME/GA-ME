import { useState, useEffect } from 'react';
import DetailInfo from '../components/detailComponents/DetailInfo';
import Statistics from '../components/detailComponents/Statistics';
import BackButton from '../components/detailComponents/BackButton';
import DetailBanner from '../components/detailComponents/DetailBanner';
import styles from '../components/detailComponents/Detail.module.css';
import { useDetailStore } from '../stores/DetailStore';
import { useParams } from 'react-router-dom';


type ActiveComponentType = 'info' | 'statistics';

function Detail(): JSX.Element {
  const { gameId } = useParams<{ gameId: string }>();
  const parsedGameId = gameId ? parseInt(gameId, 10) : undefined;

  const [activeComponent, setActiveComponent] = useState<ActiveComponentType>('info');
  const { data, fetchData } = useDetailStore();

  const handleInfoClick = () => {
    setActiveComponent('info');
  };

  const handleStatisticsClick = () => {
    setActiveComponent('statistics');
  };

  useEffect(() => {
    // userId와 gameId를 설정하고 fetchData 함수를 호출하여 데이터를 가져옴
    fetchData(123, parsedGameId); // 예시로 userId와 gameId를 123과 456으로 전달
  }, []); // 컴포넌트가 마운트될 때 한 번만 fetchData 함수 호출

  return (
    <>
      <BackButton />
      <DetailBanner />
      <div className={styles.detailContent}>
        <button onClick={handleInfoClick}>정보</button>
        <button onClick={handleStatisticsClick}>통계</button>
        <div>
          {activeComponent === 'info' && <DetailInfo data={data?.result} />}
          {activeComponent === 'statistics' && <Statistics />}
        </div>
      </div>
    </>
  );
}

export default Detail;