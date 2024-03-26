import styles from './DetailBanner.module.css'; // CSS 모듈 import

function Banner() {
  const bannerImage = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1562700/header_koreana.jpg?t=1699513185'; // 이미지 URL

  return (
    <div className={styles.bannerContainer}>
      <div style={{ backgroundImage: `url(${bannerImage})` }} className={styles.bannerBackground}>
        {/* bg 이미지 */}
        <div className={styles.darkFilter}></div>
        

        {/* 내부 컨텐츠 */}
        <div className={styles.innerContent}>
          
          {/* 찐 이미지 */}
          <img src={bannerImage} alt="Banner" className={styles.centerImage} />
          
          {/* 좋아요 버튼 */}
          <button className={styles.likeButton}>좋아요</button>
          
          {/* 왼쪽 하단 텍스트 */}
          <div className={styles.leftBottomText}>
            <h1>게임 제목</h1>
            <div>게임 짧은 설명</div>
          </div>
          {/* 오른쪽 하단 버튼 */}
          <div className={styles.rightBottomButtons}>
            <button className={styles.urlButton} onClick={() => console.log('첫 번째 버튼 클릭됨')}>첫 번째 버튼</button>
            <button className={styles.urlButton} onClick={() => console.log('두 번째 버튼 클릭됨')}>두 번째 버튼</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
