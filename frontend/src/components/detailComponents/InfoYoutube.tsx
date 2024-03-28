import React from 'react';
import styles from './InfoYoutube.module.css';

// DetailInfo 컴포넌트를 정의합니다.
const InfoYoutube: React.FC = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.title}>관련 영상</div>
    </div>
    </>
  );
};

export default InfoYoutube;
