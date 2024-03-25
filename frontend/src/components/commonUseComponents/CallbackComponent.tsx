// src/components/CallbackComponent.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import { fetchUserInfo } from '../../url/api';

const CallbackComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async (code: string) => {
      try {
        console.log('before call fetchUserInfo');
        // 서버로부터 사용자 정보를 받아옴
        const data = await fetchUserInfo(code);
        console.log('after call fetchUserInfo');
        // 받아온 사용자 정보를 store에 저장
        setUser(data.user);
        // 사용자를 home으로 리다이렉트
        navigate('/');
      } catch (error) {
        console.error('Authentication failed:', error);
        // 실패 시 로그인 페이지로 리다이렉트
        navigate('/');
      }
    };

    // URL에서 인증 코드 추출
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      fetchUser(code);
    }
  }, [location, navigate, setUser]);

  // 로딩 상태나 다른 메시지를 표시할 수 있음
  return <div>Loading...</div>;
};

export default CallbackComponent;
