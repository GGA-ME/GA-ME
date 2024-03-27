// src/components/CallbackComponent.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import { fetchKakaoUserInfo, redirectToKakaoOAuth } from '../../url/api'; // 카카오 사용자 정보를 받아오는 함수로 변경

const CallbackComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async (code: string) => {
      console.log("Callback code: "+code);
      try {
        // 서버로부터 카카오 사용자 정보를 받아옴
        const data = await fetchKakaoUserInfo(code);
        // 받아온 사용자 정보를 store에 저장
        setUser(data.user);
        // 사용자를 홈 페이지로 리다이렉트
        navigate('/');
      } catch (error) {
        console.error('Authentication failed:', error);
        alert('Authentication failed:')
        // 인증 실패 시 카카오 로그인 페이지로 다시 리디렉트
        redirectToKakaoOAuth();
      }
    };

    // URL에서 인증 코드 추출
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      fetchUser(code);
    }
  }, [location, navigate, setUser]);

  return <div>Loading...</div>;
};

export default CallbackComponent;
