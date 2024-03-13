import Navbar from "../components/commonUseComponents/Navbar";
import text from './Main.module.css'
import GameCard from '../components/commonUseComponents/GameCard'

function Main() {

  return (
    <div className="pl-52">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>깜빡인효과</h1>
        <h1 className={`${text.neonText}`}>Main</h1>
        <h1>기본</h1>
        <h1 className={`${text.neonNormal}`}>Main</h1>
      </div>

      <div>
      <GameCard
        imageUrl="/Gameicon.gif"
        title="ELDEN RING"
        price="₩ 64,800"
      />
      {/* Repeat <GameCard /> for other games as needed */}
    </div>
    </div>
  );
}
export default Main;