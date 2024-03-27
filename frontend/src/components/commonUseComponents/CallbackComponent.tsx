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
      try {
        const data = await fetchKakaoUserInfo(code);
        setUser(data.user);
        navigate('/'); // 성공 시 리다이렉트할 경로
      } catch (error) {
        console.error('Authentication failed:', error);
        // 인증 실패 시 카카오 로그인 페이지로 다시 리디렉트
        redirectToKakaoOAuth();
      }
    };

    // URL에서 인증 코드와 에러 코드 추출
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const error = queryParams.get('error');

    if (error) {
      console.error('Kakao login error:', error);
      alert(`Kakao login failed: ${error}`);
      redirectToKakaoOAuth(); // 오류 발생 시 다시 카카오 로그인 페이지로 리디렉트
    } else if (code) {
      fetchUser(code);
    }
  }, [location, navigate, setUser]);

  return <div>Loading...</div>;
};

export default CallbackComponent;
