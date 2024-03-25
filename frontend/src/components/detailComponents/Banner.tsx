import React from 'react';
import styles from './Banner.module.css'; // CSS 모듈 import

function Banner() {
  const bannerImage = 'https://i.ytimg.com/vi/wZ6wx0rSL8M/maxresdefault.jpg'; // 이미지 URL

  return (
    <div style={{ backgroundImage: `url(${bannerImage})` }} className={styles.bannerBackground}>
      {/* bg 이미지 */}
      <div className={styles.darkFilter}></div>
      
      {/* 찐 이미지 */}
      <img src={bannerImage} alt="Banner" className={styles.centerImage} />
    </div>
  );
}

export default Banner;
