import './App.css';
import { RouterProvider, createBrowserRouter,} from 'react-router-dom';
import Landing from './pages/Landing'
import Main from './pages/Main';
import Search from './pages/Search';
import Detail from './pages/Detail';
import MyPage from './pages/MyPage';
import Topic from './pages/HotTopic';
import Suvey from './pages/Suvey';
// Google OAuth callback 처리 컴포넌트
import CallbackComponent from './components/commonUseComponents/CallbackComponent'; 


const router = createBrowserRouter([
  { path: '/', element: <Landing />,},
  // 메인
  { path: 'Main', element: <Main/>},
  // 검색 페이지
  { path: 'search', element: <Search /> },
  // 게임 디테일 페이지
  { path: 'detail/:id', element: <Detail/> },
  // 마이페이지
  { path: 'myPage/:id',element: <MyPage/>},
  // 토픽 페이지
  { path: 'topic', element: <Topic/>},
  // 선호도 조사 페이지
  { path: 'suvey', element: <Suvey/> }, // 날짜,차량,시간,위치,짐종류 같은거 제출
  // Google OAuth 리다이렉트 처리
  { path: 'auth/google/callback', element: <CallbackComponent /> },
]);
export const PRIMARY_COLOR = '#4A3AFF';
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
