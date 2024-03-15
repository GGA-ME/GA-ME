import Navbar from "../components/commonUseComponents/Navbar";
// import PoketModal from "../components/commonUseComponents/PoketModal";
import Banner from "../components/mainComponents/Banner";
import Game from "../components/mainComponents/Game"
import Select from "../components/mainComponents/Select"
function Main() {

  return (
    <>
    <Navbar />
    {/* <PoketModal /> */}
    <div className="flex flex-col items-center pl-52">
      <Navbar />
      <div className="flex-grow">
        <Banner />
      </div>
      <div className="flex-grow">
        <Select />
      </div>
      <div className="flex-grow">
        <Game />
      </div>
    </div>
    </>
  );
}
export default Main;