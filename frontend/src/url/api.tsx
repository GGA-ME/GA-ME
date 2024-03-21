// src/url/api.tsx
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'     // 기본 api 주소
});

// 로그인 요청을 처리하는 함수
export const login = async () => {
  try {
    const response = await api.post('/login');
    return response.data;
  } catch (error) {
    console.log('로그인 실패!', error);
  }
};

export { api };
