import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Navbar from "../components/commonUseComponents/Navbar";
import Result from "../components/searchComponents/Result";
import useSearchStore from '../stores/searchStore';
import useUserStore from '../stores/userStore';
import { searchGames } from '../url/api';
import style from './Search.module.css'; // CSS Module import

function Search() {
    const [keyword, setKeyword] = useState('');
    const user = useUserStore((state) => state.user);
    const setResults = useSearchStore((state) => state.setResults);

    const userId = user?.userId ?? null;

    const handleSearch = async () => {
        if (!userId) {
            console.log('사용자가 로그인하지 않았습니다.');
            //return;
        }
        
        try {
            const response = await searchGames(keyword, userId);
            if (response.isSuccess) {
                setResults(response.result);
                console.log('검색 결과가 저장되었습니다.');
            } else {
                console.error('검색 실패:', response.message);
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    };

    // 엔터 키 입력 감지 함수
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if(event.key === 'Enter') {
          handleSearch();
      }
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center">
                <h1>Search 페이지</h1>
                <div className={style.searchContainer}>
                    <input 
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={handleKeyPress} // 엔터 키 입력 감지
                        placeholder="검색어를 입력하세요"
                        className={style.searchInput}
                    />
                    <button onClick={handleSearch} className={style.searchButton}>
                        <FaSearch />
                    </button>
                </div>
                <Result/>
            </div>
        </>
    );
}

export default Search;
