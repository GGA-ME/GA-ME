import React from 'react'
import SearchGameListComponent from './SearchGameList'
import RelatedTagList from './RelatedTagList'

const CombinationList: React.FC = () => {
    return(
        <>
        <SearchGameListComponent />
        <RelatedTagList />
        </>
    )
}

export default CombinationList