import React from "react";
import useMixAndMatchStore from "../../stores/mixAndMatchStore";
import style from "./MixandMatch.module.css";

const CombinationList: React.FC = () => {
  const { results, loading } = useMixAndMatchStore(); // 로딩 상태 가져오기

  const tagDtoList = results?.tagDtoList;
  const hasTags = tagDtoList && tagDtoList.length > 0; // 태그가 있는지 확인

  return (
    <div>
      {/* 로딩 중이 아니고 데이`터가 없는 경우 */}
      {!loading && !hasTags}

      {/* 로딩 중이 아니고 태그 데이터가 있는 경우에만 관련 태그 문구 표시 */}

      {!loading && hasTags && (
        <div className={style.box}>
          <img src="./MixMatchBearker.PNG"/>
          <div className="mt-2 mb-1 ml-3 text-[20px] font-sejong">
            주요 Mix 태그🧪
          </div>
          <hr className={style.hr}></hr>
          <div className="mb-3">
            {tagDtoList?.map((tag) => (
              <div
                key={tag.tagId}
                className="bg-tag-gray inline-block px-2 py-1 rounded-[3px] ml-3"
              >
                #{tag.tagName}
              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default CombinationList;
