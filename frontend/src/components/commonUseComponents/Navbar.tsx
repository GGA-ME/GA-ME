import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import style from './Navbar.module.css';

// 네비게이션 링크를 위한 타입 정의
interface NavLinkItem {
    path: string;
    label: string;
    icon: string;
    activeIcon: string;
}

const Navbar: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navLinkYPositions: number[] = [0, 65, 130, 195]; // 각 네비게이션 항목에 대한 Y 위치

    // 로컬 스토리지에서 indicatorY 상태를 읽어옵니다.
    const initialY: number = localStorage.getItem('indicatorY') ? Number(localStorage.getItem('indicatorY')) : navLinkYPositions[0];
    const [indicatorY, setIndicatorY] = useState<number>(initialY);

    const navLinks: NavLinkItem[] = [
        { path: "/Main", label: "Main", icon: '/Gameicon.png', activeIcon: '/Gameicon.gif' },
        { path: "/search", label: "Search", icon: '/SearchIcon.png', activeIcon: '/SearchIcon.gif' },
        { path: "/topic", label: "Hot Topic", icon: '/FireIcon.png', activeIcon: '/FireIcon.gif' },
        { path: "/myPage", label: "My Page", icon: '/ProfileIcon.png', activeIcon: '/ProfileIcon.gif' }
    ];

    useEffect(() => {
        const activeLinkIndex = navLinks.findIndex(link => isActive(link.path));
        if (activeLinkIndex !== -1) {
            const newY = navLinkYPositions[activeLinkIndex];
            setIndicatorY(newY);
            // 상태를 로컬 스토리지에 저장합니다.
            localStorage.setItem('indicatorY', newY.toString());
        }
    }, [location.pathname]); // location.pathname이 변경될 때마다 실행

    const variants = {
        active: { y: indicatorY },
    };

    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col items-center px-8 h-screen py-20 bg-gray-900 text-white">
                <div className="mb-24">
                    <img className="w-24" src='./GGAME.gif' alt='GGAMELOGO' />
                </div>

                <div className="relative pl-8">
                    <motion.div
                        className="absolute left-0 px-2 py-1 border-2 border-cyan-500 rounded-full"
                        style={{ width: 'calc(120% - 1rem)', maxWidth: '300px' }}
                        variants={variants}
                        initial={false}
                        animate="active"
                        transition={{ type: "spring", stiffness: 100 }}
                    >▷</motion.div>

                    {navLinks.map((link, index) => (
                        <NavLink key={index} to={link.path} className="flex items-center space-x-2 mb-8">
                            <img
                                src={isActive(link.path) ? link.activeIcon : link.icon}
                                className="transition-all duration-300 ease-in-out"
                                style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                                alt={`${link.label} Icon`}
                            />
                            <span className={`${style.neonNormal} text-2xl`}>{link.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Navbar;