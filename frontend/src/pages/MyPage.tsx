import Navbar from "../components/commonUseComponents/Navbar";
import Profile from "../components/MyPageComponents/Profile"
import Statistics from '../components/MyPageComponents/Statistics'

// function MyPage({userId}: {userId: number}) {
  function MyPage() {
    return (
        // <><Navbar /><Profile userId={userId}/><h1>MyPage</h1></>
        <>
          <Navbar />
          <Profile />
          <Statistics />
          <h1>YyPage</h1>
        </>
    )
  }
  export default MyPage;