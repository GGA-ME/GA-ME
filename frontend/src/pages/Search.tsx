import React from 'react';
import Navbar from "../components/commonUseComponents/Navbar";
import Result from "../components/searchComponents/Result";
import SearchBox from '../components/searchComponents/SearchBox';

function Search() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <h1>Search 페이지</h1>
                <SearchBox />
                <Result/>
            </div>
        </>
    );
}

export default Search;
