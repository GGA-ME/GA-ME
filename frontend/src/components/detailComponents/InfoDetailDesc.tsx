import React from 'react';
import styles from './InfoDetailDesc.module.css';
import { GameData } from '../../stores/DetailStore';


interface InfoDetailDescProps {
    data: GameData | undefined;
  }
  
  const InfoDetailDesc: React.FC<InfoDetailDescProps> = ({ data }) => {
  return (
    <>
    <div className={styles.container}>
        <div>상세 정보</div>
        <div>{data}</div>
    </div>
    </>
  );
};

export default InfoDetailDesc;
