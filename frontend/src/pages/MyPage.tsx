import Navbar from "../components/commonUseComponents/Navbar";
// import Profile from "../components/MyPageComponents/Profile";
import useUserStore from '../stores/userStore';

function MyPage() {
  const { user } = useUserStore();

  console.log('MyPage() user: ');
  console.log(user);

  return (
    <>
      <Navbar />
      <div className="pl-80 pr-52 w-full">
        <p>{user?.userId}</p>
        {/* <Profile /> */}
      </div>
    </>
  );
}
export default MyPage;
