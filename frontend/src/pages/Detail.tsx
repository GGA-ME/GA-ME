import { useState } from 'react';
// import DetailInfo from '../components/detailComponents/DetailInfo';
import Statistics from '../components/detailComponents/Statistics';
import BackButton from '../components/detailComponents/BackButton';
import DetailBanner from '../components/detailComponents/DetailBanner';

type ActiveComponentType = 'info' | 'statistics' | null;

function Detail(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<ActiveComponentType>(null);

  const handleInfoClick = () => {
    setActiveComponent('info');
  };

  const handleStatisticsClick = () => {
    setActiveComponent('statistics');
  };

  return (
    <>
      <BackButton />
      <DetailBanner />
      <div>
        <button onClick={handleInfoClick}>정보</button>
        <button onClick={handleStatisticsClick}>통계</button>
      </div>
      {/* {activeComponent === 'info' && <DetailInfo />} */}
      {activeComponent === 'statistics' && <Statistics />}
    </>
  );
}

export default Detail;
