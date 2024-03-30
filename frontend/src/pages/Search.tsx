import Navbar from "../components/commonUseComponents/Navbar";
import Result from "../components/searchComponents/Result";
import Poket from "../components/commonUseComponents/Poket";
import SearchBox from '../components/searchComponents/SearchBox';
import Title from "../components/searchComponents/Title";

function Search() {
    return (
        <>
            <Navbar />
            <Poket />
            <div className="ml-[200px]">
                <Title />
                <SearchBox />
                <Result/>
            </div>
        </>
    );
}

export default Search;
