import text from './text.module.css'

function Main() {

  return (
    <>
      <h1>깜빡임효과</h1>
      <h1 className={`${text.neonText}`}>Main</h1>
      <h1>기본</h1>
      <h1 className={`${text.neonNormal}`}>Main</h1>
    </>
  );
}
export default Main;