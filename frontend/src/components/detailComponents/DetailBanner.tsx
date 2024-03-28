import styles from './DetailBanner.module.css'; // CSS 모듈 import

// Define an interface for the props
interface BannerProps {
  bannerImage: string | undefined;
  gameId: number | undefined;
  gameName: string | undefined;
  gameShortDescription: string | undefined;
  gameIsLike: boolean | undefined;
}

const Banner: React.FC<BannerProps> = ({ bannerImage, gameId, gameName, gameShortDescription, gameIsLike }) => {
  // 텍스트 길이가 이 값 이상이면 공백을 찾아서 줄넘김을 추가하는 함수
  // 문장이 끝날 때까지 단어 단위로 자르고, 각 줄의 길이를 체크하여 줄넘김을 추가하는 함수
  const addLineBreaks = (text: string, maxLength: number) => {
    const words = text.split(' ');
    let result = '';
    let line = '';
    for (const word of words) {
      let remainingWord = word;
      while (remainingWord.length > maxLength) {
          // 남은 단어가 maxLength보다 길면 maxLength 단위로 쪼개서 추가
          result += remainingWord.slice(0, maxLength) + '<br>';
          remainingWord = remainingWord.slice(maxLength);
      }
      // maxLength를 넘지 않는 단어를 추가
      line += remainingWord + ' ';
      if (line.trim().length >= maxLength) {
          result += line.trim() + '<br>';
          line = '';
      }
  }
    result += line.trim(); // 마지막 줄 추가
    return result;
  };
  
  // 줄넘김이 적용된 텍스트
  const MAX_LENGTH = 51; // 최대 길이 지정
  const modifiedShortDescription = addLineBreaks(gameShortDescription || '', MAX_LENGTH);
  
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
            <h1>{gameName}</h1>
            <div dangerouslySetInnerHTML={{ __html: modifiedShortDescription }} />
          </div>
          {/* 오른쪽 하단 버튼 */}
          <div className={styles.rightBottomButtons}>
            <button className={styles.urlButton} onClick={() => console.log('첫 번째 버튼 클릭됨')}>스팀으로 이동</button>
            <button className={styles.urlButton} onClick={() => console.log('두 번째 버튼 클릭됨')}>포켓에 담기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
