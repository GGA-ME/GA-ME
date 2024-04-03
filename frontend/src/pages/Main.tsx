import { useEffect } from "react";
import Navbar from "../components/commonUseComponents/Navbar";
import Poket from "../components/commonUseComponents/Poket";
import Banner from "../components/mainComponents/Banner";
import Game from "../components/mainComponents/Game"
import Select from "../components/mainComponents/Select"
import useUserStore from "../stores/userStore";
import useHotTopicStore from "../stores/hotTopicStore";
function Main() {  
  const { user } = useUserStore();
  const { newsData, nLoading, newsFetched,fetchNewsData } = useHotTopicStore();
  useEffect(() => {
    if (user && !newsFetched && !nLoading&& newsData==null) {
      console.log("news : Main요청")
      fetchNewsData(user.userId);
    }
  }, [user]); // 두 번째 매개변수로 빈 배열 전달
  return (
    
    <>
    <div className="flex">
    <Navbar /> {/* 네브바를 화면의 왼쪽에 고정 */}
    <Poket />
    <div className="pl-72 pr-36 w-full"> {/* 네브바 옆으로 메인 컨텐츠를 배치하되, pl-64를 사용하여 네브바의 너비만큼 패딩을 줍니다. */}
    <div className="max-w-full overflow-hidden"> {/* overflow-hidden을 사용하여 화면 너비를 초과하는 내용이 스크롤되지 않도록 합니다. */}
        <Banner />
        <Select />
        <Game />
    </div>
    </div>
    </div>
    </>
  );
}
export default Main;
