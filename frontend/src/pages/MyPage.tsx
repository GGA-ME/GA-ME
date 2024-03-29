import Navbar from "../components/commonUseComponents/Navbar";
import Profile from "../components/MyPageComponents/Profile";

function MyPage() {
  return (
    <>
      <Navbar />
      <div className="pl-80 pr-52 w-full">
        <Profile />
      </div>
    </>
  );
}
export default MyPage;
