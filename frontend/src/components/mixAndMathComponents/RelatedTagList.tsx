import React from "react";
import useMixAndMatchStore from "../../stores/mixAndMatchStore";
import style from "./MixandMatch.module.css";
const CombinationList: React.FC = () => {
  const { results } = useMixAndMatchStore();

  const tagDtoList = results?.tagDtoList;
  return (
    <div className={style.box}>
      <div className="mt-2 mb-1 ml-3 text-[20px]">
        관련 태그👇
      </div>
      <hr className={style.hr}></hr>
      <div className="mb-3">
        {tagDtoList?.map((tag) => (
          <div className="bg-tag-gray inline-block px-2 py-1 rounded-[3px] ml-3">
            #{tag.tagName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CombinationList;
