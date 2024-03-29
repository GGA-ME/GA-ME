import styles from './DetailBanner.module.css'; // CSS 모듈 import
import usePoketStore from '../../stores/poketStore';
// Define an interface for the props
interface BannerProps {
  bannerImage: string;
  gameId: number;
  gameName: string;
  gameShortDescription: string | undefined;
  gameIsLike: boolean | undefined;
  price: string;
  tagsAll: Array<{ codeId: string; tagId:number; tagName: string }> | undefined;
}

import LikeImage from '/Like.png';
import { useDetailStore } from '../../stores/DetailStore';
// import OnLikeImage from '/OnLike.png';

const Banner: React.FC<BannerProps> = ({ bannerImage, gameId, gameName, gameShortDescription, gameIsLike, price, tagsAll }) => {

  // 줄넘김이 적용된 텍스트
  const MAX_LENGTH = 51; // 최대 길이 지정
  const { toggleIsLike } = useDetailStore()
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
  const modifiedShortDescription = addLineBreaks(gameShortDescription || '', MAX_LENGTH);
  // const likeButtonImageSrc = gameIsLike ? 'OnLikeImage' : LikeImage;
  const likeButtonImageSrc = gameIsLike ? '❤️' : '🤍';

  const likeClickHandler = () => {
    toggleIsLike(gameIsLike, gameId, 1)
  }
    // 버튼 클릭 핸들러 - 스팀으로 이동
  const steamButtonClickHandler = () => {
    const steamUrl = `https://store.steampowered.com/app/${gameId}/PUBG_BATTLEGROUNDS/?l=koreana`;
    window.open(steamUrl, '_blank');
  }
  const { addItem } = usePoketStore();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // 이벤트 버블링 중지
    const imageUrl = bannerImage
    const title = gameName
    const itemToAdd = { gameId, imageUrl, title, price, tagsAll };
    addItem(itemToAdd);
  };
  return (
    <>
    <div className={styles.bannerContainer}>
      <div style={{ backgroundImage: `url(${bannerImage})` }} className={styles.bannerBackground}>
        {/* bg 이미지 */}
        <div className={styles.darkFilter}></div>
        

        {/* 내부 컨텐츠 */}
        <div style={{ backgroundImage: `url(${bannerImage})` }} className={styles.innerContent}>
          
          {/* 찐 이미지 */}
          {/* <img src={bannerImage} alt="Banner" className={styles.centerImage} /> */}
          
          {/* 좋아요 버튼 */}
          <button className={styles.likeButton} onClick={likeClickHandler}>
            {/* <img src={likeButtonImageSrc} alt="Like" /> */}
            {likeButtonImageSrc}
          </button>
          
          {/* 왼쪽 하단 텍스트 */}
          <div className={styles.leftBottomText}>
            <h1>{gameName}</h1>
            <div dangerouslySetInnerHTML={{ __html: modifiedShortDescription }} />
          </div>
          {/* 오른쪽 하단 버튼 */}
          <div className={styles.rightBottomButtons}>
            <button className={styles.urlButton} onClick={steamButtonClickHandler}>스팀으로 이동</button>
            <button className={styles.urlButton} onClick={(event) => handleAddToCart(event)}>포켓에 담기</button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Banner;
