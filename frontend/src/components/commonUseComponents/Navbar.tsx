// 장현욱

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import style from './Navbar.module.css';
import useUserStore from '../../stores/userStore';

// 네비게이션 링크를 위한 타입 정의
interface NavLinkItem {
    path?: string;
    label: string;
    icon: string;
    activeIcon: string;
    action?: () => void; // 클릭 시 실행할 액션(함수) 추가
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const { setIsLoggedIn } = useUserStore();
    const fetchAndSetUser = useUserStore((state) => state.fetchAndSetUser);

    const navLinkYPositions: number[] = [0, 65, 130, 195]; // 각 네비게이션 항목에 대한 Y 위치

    // 로컬 스토리지에서 indicatorY 상태를 읽어옵니다.
    const initialY: number = localStorage.getItem('indicatorY') ? Number(localStorage.getItem('indicatorY')) : navLinkYPositions[0];
    const [indicatorY, setIndicatorY] = useState<number>(initialY);

    // 로그인 되었는지 확인
    const isLoggedIn = useUserStore(state => state.isLoggedIn);
    const handleLoginClick = () => {
        window.Kakao.Auth.login({
          success: function(authObj) {
            console.log(authObj); // 인증 정보 출력
            // authObj 객체에서 access_token을 추출
            const accessToken = authObj.access_token;
            // 스토어의 fetchAndSetUser 함수 호출하여 서버에 사용자 정보 요청
            fetchAndSetUser(accessToken); 
            setIsLoggedIn(true);
          },
          fail: function(err) {
            console.error(err); // 에러 처리
          }
        });
    };

    const navLinks: NavLinkItem[] = [
        { path: "/", label: "Main", icon: '/Gameicon.png', activeIcon: '/Gameicon.gif' },
        { path: "/search", label: "Search", icon: '/SearchIcon.png', activeIcon: '/SearchIcon.gif' },
        { path: "/mixAndMatch", label: "MixAndMatch", icon: '/SearchIcon.png', activeIcon: '/SearchIcon.gif' },
        { path: "/topic", label: "Hot Topic", icon: '/FireIcon.png', activeIcon: '/FireIcon.gif' },
        // 로그인 상태에 따라 분기 처리
        isLoggedIn ? 
            { path: "/myPage", label: "My Page", icon: '/ProfileIcon.png', activeIcon: '/ProfileIcon.gif' } :
            { label: "Login", icon: '/ProfileIcon.png', activeIcon: '/ProfileIcon.gif', action: handleLoginClick }, 
    ];

    useEffect(() => {
        // path가 정의된 링크만 찾기
        const activeLinkIndex = navLinks.findIndex(link => link.path && isActive(link.path));
        if (activeLinkIndex !== -1) {
            const newY = navLinkYPositions[activeLinkIndex];
            setIndicatorY(newY);
            // 상태를 로컬 스토리지에 저장
            localStorage.setItem('indicatorY', newY.toString());
        }
    }, [location.pathname]); // location.pathname이 변경될 때마다 실행
      

    const variants = {
        active: { y: indicatorY },
    };

    return (
        <>
            <div className={`${style.neonBorder} fixed top-0 left-5 flex flex-col items-center px-8 h-screen py-20 border-r-2 bg-gray-900 text-white z-40`}>
                <div className="mb-24">
                    <NavLink to="/">
                        <motion.img
                            className="w-24"
                            src='./GGAME.gif'
                            alt='GGAMELOGO'
                            whileHover={{ y: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    </NavLink>
                </div>

                <div className="relative pl-8">
                    <motion.div
                        className="absolute left-0 px-2 py-1 border-2 border-cyan-500 rounded-full"
                        style={{ width: 'calc(120% - 1rem)', maxWidth: '300px' }}
                        variants={variants}
                        initial={false}
                        animate="active"
                    >▷</motion.div>

                    {navLinks.map((link, index) => {
                    // path가 있는 경우 NavLink 컴포넌트 사용
                    if (link.path) {
                        return (
                        <NavLink key={index} to={link.path} className="flex items-center space-x-2 mb-8">
                            <img
                            src={isActive(link.path) ? link.activeIcon : link.icon}
                            className="transition-all duration-300 ease-in-out"
                            style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                            alt={`${link.label} Icon`}
                            />
                            <span className={`${style.neonNormal} text-2xl`}>{link.label}</span>
                        </NavLink>
                        );
                    } else {
                        // path가 없는 경우 (예: 로그인 버튼), div와 onClick 이벤트를 사용
                        return (
                        <div key={index} onClick={link.action} className="flex items-center space-x-2 mb-8 cursor-pointer">
                            <img
                            src={link.icon}
                            className="transition-all duration-300 ease-in-out"
                            style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                            alt={`${link.label} Icon`}
                            />
                            <span className={`${style.neonNormal} text-2xl`}>{link.label}</span>
                        </div>
                        );
                    }
                    })}

                </div>
            </div>
        </>
    );
}

export default Navbar;