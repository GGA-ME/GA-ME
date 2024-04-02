import React from "react";
import styles from "./WordCloud.module.css";
interface WordCloudProps {
    gameWordCloudUrl: string | null; // 또는 undefined, 사용하는 컴포넌트의 상황에 맞춰 조정
  }

const InfoDescription: React.FC<WordCloudProps> = ({ gameWordCloudUrl })  => {
  return (
    <>
      <div className={`${styles.container}`}>
        <h1 className={styles.reviewTitle}>리뷰 분석</h1>
      {gameWordCloudUrl ? <img src={gameWordCloudUrl} alt="Game Word Cloud" /> : 
      <div className={`${styles.wordCloudContainer}`}>
            <p> 분석을 할만한 충분한 댓글 데이터가 없습니다 💦</p>
        </div>}
      </div>
    </>
  );
};

export default InfoDescription;
