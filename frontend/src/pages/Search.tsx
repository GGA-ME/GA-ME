import Navbar from "../components/commonUseComponents/Navbar";
import Result from "../components/searchComponents/Result";
import SearchBox from '../components/searchComponents/SearchBox';
import Title from "../components/searchComponents/Title";

function Search() {
    return (
        <>
            <Navbar />
            <div className="ml-[250px]">
                <Title />
                <SearchBox />
                <Result/>
            </div>
        </>
    );
}

export default Search;
