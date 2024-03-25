import React from 'react'
import SearchGameList from './SearchGameList'
import RelatedTagList from './RelatedTagList'


interface CombinationListProps {
    handleCombination: () => Promise<any>; // handleCombination 함수의 타입 정의
  }
  const CombinationList: React.FC<CombinationListProps> = ({ handleCombination }) => {
    return(
        <>
        <SearchGameList handleCombination={handleCombination} />
        <RelatedTagList />
        </>
    )
}

export default CombinationList


