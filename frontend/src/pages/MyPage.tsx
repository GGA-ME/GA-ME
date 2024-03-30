import Navbar from "../components/commonUseComponents/Navbar";
import Profile from "../components/MyPageComponents/Profile";
import useUserStore from '../stores/userStore';

function MyPage() {
  const { user } = useUserStore();

  console.log('MyPage() user: ');
  console.log(user);

  return (
    <>
      <div style={{ position: 'relative' }}>
      <Navbar />
      <div style={{ position: 'absolute', top: '150px', left: '300px' }}>
        <Profile />
      </div>
    </div>
    </>
  );
}
export default MyPage;
