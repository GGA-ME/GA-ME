import React from "react";
import styles from "./InfoDetailDesc.module.css";
import { GameData } from "../../stores/DetailStore";

interface InfoDetailDescProps {
  data: GameData | undefined;
}

const InfoDetailDesc: React.FC<InfoDetailDescProps> = ({ data }) => {
    // 가격 ,변환을 위한 함수
    function formatPrice(priceStr: string) {
        const numericPrice = parseInt(priceStr?.substring(1), 10);
        return `₩${numericPrice.toLocaleString()}`;
      }
    return (
    <div
      style={{ backgroundImage: `url(${data?.gameHeaderImg})` }}
      className={`${styles.container}`}
    >
      <div className={styles.darkFilter}></div>

      <div className={styles.innerContent}>
        <div className={styles.innerInfo}>
          {/* 왼쪽 상단에 게임 제목 */}
          <h1 className={styles.gameTitle}>{data?.gameName}</h1>

          {/* 중간에 테두리가 있는 박스 */}
          <div className={styles.infoBox}>
            {/* 왼쪽 편에 3개의 정보 */}
            <div className={styles.leftInfo}>
              <div>출시일 : {data?.gameReleaseDate}</div>
              <div>개발자 : {data?.gameDeveloper}</div>
              <div>배급사 : {data?.gamePublisher}</div>
            </div>

            {/* 오른쪽에 3개의 정보 */}
            <div className={styles.rightInfo}>
              {data?.gameDiscountPercent != 0 ? (
                <div>
                  <div>{formatPrice(((data?.gamePriceInitial ??0) / 100).toString() ?? '')}</div>
                  <div>{data?.gameDiscountPercent}</div>
                </div>
              ) : null}
              <div>{formatPrice(((data?.gamePriceFinal ?? 0) / 100).toString() ?? '')}</div>
            </div>
          </div>

          {/* 태그 정보 반복문으로 출력 */}
          <div className={styles.tags}>
            {data?.gameTagList?.map((tag, index) => (
              <span key={index} className={styles.tag}>
                # {tag.tagName}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoDetailDesc;
