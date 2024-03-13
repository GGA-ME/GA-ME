import text from './Main.module.css'


function Landing() {

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
        <h1>깜빡인효과</h1>
        <h1 className={`${text.neonText}`}>Landing</h1>
        <h1>기본</h1>
        <h1 className={`${text.neonNormal}`}>Landing</h1>
        
      </div>
        </>
    );
}
export default Landing;