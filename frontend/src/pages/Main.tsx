import Navbar from "../components/commonUseComponents/Navbar";
// import PoketModal from "../components/commonUseComponents/PoketModal";
import Banner from "../components/mainComponents/Banner";
import Game from "../components/mainComponents/Game"
import Select from "../components/mainComponents/Select"
function Main() {

  return (
    <>
    <div className="flex">
    <Navbar/> {/* 네브바를 화면의 왼쪽에 고정 */}
    {/* <PoketModal /> */}
    <div className="pl-48 w-full"> {/* 네브바 옆으로 메인 컨텐츠를 배치하되, pl-64를 사용하여 네브바의 너비만큼 패딩을 줍니다. */}
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
