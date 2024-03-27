// src/components/CallbackComponent.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import { fetchKakaoUserInfo } from '../../url/api';

const CallbackComponent = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const fetchUser = async () => {
        try {
          const data = await fetchKakaoUserInfo(code);
          setUser(data.user);
          navigate('/');
        } catch (error) {
          alert('또 에러야 또 Authentication failed');
          console.error('Authentication failed:', error);
          // 에러 처리 로직...
        }
      };

      fetchUser();
    }
  }, [navigate, setUser]);

  return <div>Loading...</div>;
};

export default CallbackComponent;
