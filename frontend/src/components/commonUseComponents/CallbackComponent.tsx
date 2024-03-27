// src/components/CallbackComponent.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import { fetchKakaoUserInfo, redirectToKakaoOAuth } from '../../url/api';

const CallbackComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    // URL에서 인증 코드 추출
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    console.log("Callback Component mounted. Extracted code:", code);

    const fetchUser = async () => {
      if (code) {
        console.log("Attempting to fetch user with code:", code);
        try {
          // 서버로부터 카카오 사용자 정보를 받아옴
          const data = await fetchKakaoUserInfo(code);
          console.log("Fetched user data:", data);
          // 받아온 사용자 정보를 store에 저장
          setUser(data.user);
          // 사용자를 홈 페이지로 리다이렉트
          navigate('/');
        } catch (error) {
          console.error('Authentication failed:', error);
          alert('Authentication failed. Redirecting to Kakao login.');
          // 인증 실패 시 카카오 로그인 페이지로 다시 리디렉트
          redirectToKakaoOAuth();
        }
      }
    };

    fetchUser();
  }, [location.search]); // location.search가 변경될 때만 useEffect 실행

  return <div>Loading...</div>;
};

export default CallbackComponent;
