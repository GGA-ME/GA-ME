// src/url/api.tsx
import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const BASE_URL = "https://j10e105.p.ssafy.io/api";
const REDIRECT_URI = 'https://j10e105.p.ssafy.io/auth/google/callback';
const SCOPE = 'profile email';

const api = axios.create({
  baseURL: BASE_URL // 기본 api 주소
});

// 사용자를 구글 로그인 페이지로 리디렉트하는 함수
export const redirectToGoogleOAuth = () => {
  // 구글 OAuth 로그인 URL 생성
  const oauthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${encodeURIComponent(CLIENT_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}`;
  // 현재 브라우저를 해당 URL로 리디렉트
  window.location.href = oauthUrl;
};

// 서버에 인증 코드를 전송하여 사용자 정보를 받아오는 함수
export const fetchUserInfo = async (code: string) => {
  try {
    console.log('In fetchUserInfo');
    console.log('Code: '+code);
    const response = await api.post('/auth/google/callback', { code });
    return response.data; // 사용자 정보와 새로운 사용자 여부를 반환
  } catch (error) {
    throw new Error('Failed to fetch user information'+error);
  }
};


// 게임명 검색 API 함수
export const searchGames = async (keyword: string, userId: number) => {
  try {
    const response = await api.post('/search', {
      keyword,
      userId
    });
    return response.data; // 검색 결과를 반환
  } catch (error) {
    throw new Error('Failed to search games');
  }
};

export { api };
