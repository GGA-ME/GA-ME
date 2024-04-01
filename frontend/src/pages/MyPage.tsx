import Navbar from "../components/commonUseComponents/Navbar";
import Poket from '../components/commonUseComponents/Poket';
import Profile from "../components/MyPageComponents/Profile";

function MyPage() {

  return (
    <>
      <div style={{ position: "relative" }}>
        <Navbar />
        <Poket/>
        <div style={{ position: "absolute", left: "350px", top: '100px' }}>
          <Profile />
        </div>
      </div>
    </>
  );
}
export default MyPage;
