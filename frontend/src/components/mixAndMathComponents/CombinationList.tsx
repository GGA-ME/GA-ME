import React from "react";
import SearchGameList from "./SearchGameList";
import RelatedTagList from "./RelatedTagList";

const CombinationList: React.FC = () => {
  return (
    <>
      <SearchGameList />
      <RelatedTagList />
    </>
  );
};

export default CombinationList;
