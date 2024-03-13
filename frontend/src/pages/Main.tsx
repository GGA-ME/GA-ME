import Navbar from "../components/commonUseComponents/Navbar";
import text from './Main.module.css'

function Main() {

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1>깜빡인효과</h1>
        <h1 className={`${text.neonText}`}>Main</h1>
        <h1>기본</h1>
        <h1 className={`${text.neonNormal}`}>Main</h1>
        
      </div>
    </>
  );
}
export default Main;