import React from "react";
import useMixAndMatchStore from "../../stores/mixAndMatchStore";
import style from "./MixandMatch.module.css";
const CombinationList: React.FC = () => {
  const { results } = useMixAndMatchStore();

  const tagDtoList = results?.tagDtoList;
  console.log("searchResult::::", tagDtoList);
  return (
    <div className={style.box}>
      <div>👇관련 태그</div>
      <div>
        {tagDtoList?.map((tag) => (
          <div>{tag.tagName}</div>
        ))}
      </div>
    </div>
  );
};

export default CombinationList;
