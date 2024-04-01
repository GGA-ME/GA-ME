// import Navbar from "../components/commonUseComponents/Navbar";
// import Poket from '../components/commonUseComponents/Poket';
// import Profile from "../components/MyPageComponents/Profile";
import useUserStore from "../stores/userStore";

function MyPage() {
  const {user} = useUserStore();
  console.log('MyPage에서 출력한 User ')
  console.log(user);

  return (
    <>
    <div><h1>아무것도 안되는 거야?</h1></div>
      {/* <div style={{ position: "relative" }}>
        <Navbar />
        <Poket/>
        <div style={{ position: "absolute", left: "350px", top: '100px' }}>
          <Profile />
        </div>
      </div> */}
    </>
  );
}
export default MyPage;
