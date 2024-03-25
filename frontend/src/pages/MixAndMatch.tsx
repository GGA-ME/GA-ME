import Navbar from "../components/commonUseComponents/Navbar";
import CombinationList from "../components/mixAndMathComponents/CombinationList";
import Result from "../components/mixAndMathComponents/Result";
import mixAndMatchStore from "../stores/mixAndMatchStore"

function MixAndMatch() {

  const {fetchData} = mixAndMatchStore();

  // useSearchStore에서 검색 결과 가져오기
  const results = mixAndMatchStore((state) => state.results);

  const postData = ""// 현욱씌가 짜준 전역 변수 및 함수에서 가져오기

  const handleCombination = async (postData) => {
    try {
      const res = await fetchData(postData);
      console.log("Data fetched successfully in MixAndMatch page:", res);
      return res;
    } catch (error) {
      console.error("Error occurred while fetching data in MixAndMatch page:", error);
      throw error;
    }
  };

  return (
    <>
    <div className="flex">
    <Navbar /> {/* 네브바를 화면의 왼쪽에 고정 */}
    {/* <PoketModal /> */}
    <div className="pl-60 w-full"> {/* 네브바 옆으로 메인 컨텐츠를 배치하되, pl-64를 사용하여 네브바의 너비만큼 패딩을 줍니다. */}
    <div className="max-w-full overflow-hidden"> {/* overflow-hidden을 사용하여 화면 너비를 초과하는 내용이 스크롤되지 않도록 합니다. */}
    여기가 컴포넌트 넣는곳
    하영쓰의 미스엔매치


    <CombinationList handleCombination={handleCombination} />
    <Result results={results}/>


    </div>
    </div>
    </div>
    </>
  );
}
export default MixAndMatch;
