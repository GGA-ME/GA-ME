import Navbar from "../components/commonUseComponents/Navbar";
import Custom from "../components/searchComponents/Custom";


function Search() {

    return (
      <>
      <Navbar />
      <div className="flex flex-col items-center pl-52">
      <Custom/>
        <h1>Search 페이지</h1>
      </div>
      </>
    );
  }
  export default Search;