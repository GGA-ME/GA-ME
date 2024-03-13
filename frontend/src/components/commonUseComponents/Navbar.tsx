import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'
import style from './Navbar.module.css'


function Navbar() {

    // 호버시 효과를 주기위한 함수인데.. 이동이 부드럽지도 않고 클릭시 버튼이 한순간 크기가 작아지는게 거슬려서 일단 보류
    // 사용법은 className 에 onMouseOver={hoverHotTopicIcon} onMouseOut={leaveHotTopicIcon} 식으로 선언해서 사용
    // 메인
    // const hoverGameIcon = () => {
    //     const imgElement = document.getElementById('gameIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/Gameicon.gif'; // 호버
    //         imgElement.style.width = '50px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }
    // const leaveGameIcon = () => {
    //     const imgElement = document.getElementById('gameIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/Gameicon.png'; // 호버 out
    //         imgElement.style.width = '30px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }

    // // 서치
    // const hoverSearchIcon = () => {
    //     const imgElement = document.getElementById('searchIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/SearchIcon.gif'; // 호버
    //         imgElement.style.width = '50px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }
    // const leaveSearchIcon = () => {
    //     const imgElement = document.getElementById('searchIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/SearchIcon.png'; // 호버 out
    //         imgElement.style.width = '30px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }

    // // 핫토픽
    // const hoverHotTopicIcon = () => {
    //     const imgElement = document.getElementById('hotTopicIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/FireIcon.gif'; // 호버
    //         imgElement.style.width = '50px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }
    // const leaveHotTopicIcon = () => {
    //     const imgElement = document.getElementById('hotTopicIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/FireIcon.png'; // 호버 out
    //         imgElement.style.width = '30px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }

    // // 프로필
    // const hoverProfileIcon = () => {
    //     const imgElement = document.getElementById('profileIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/ProfileIcon.gif'; // 호버
    //         imgElement.style.width = '50px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }
    // const leaveProfileIcon = () => {
    //     const imgElement = document.getElementById('profileIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/ProfileIcon.png'; // 호버 out
    //         imgElement.style.width = '30px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }

    // // 로그인
    // const hoverLoginIcon = () => {
    //     const imgElement = document.getElementById('loginIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/LoginIcon.gif'; // 호버
    //         imgElement.style.width = '50px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }
    // const leaveLoginIcon = () => {
    //     const imgElement = document.getElementById('loginIcon')
    //     if (imgElement instanceof HTMLImageElement) { // imgElement가 null이 아닌지 확인
    //         imgElement.src = '/LoginIcon.png'; // 호버 out
    //         imgElement.style.width = '30px'; // 너비 조정
    //         imgElement.style.height = 'auto'; // 높이 자동 조정
    //     }
    // }

    const location = useLocation();
    // 현재 경로가 각 NavLink의 경로와 일치하는지 확인
    const isActive = (path: string) => location.pathname === path;

    // const userId = '123'; // => 유저 아이디 받아오기 나중에 프로필과 연결

    return (
        <>
            <div className="fixed top-0 left-0 flex flex-col items-center w-40 h-screen py-20 bg-gray-900 text-white">
                {/* Navbar heading or logo */}
                <div className="mb-10">
                    {/* Replace with your logo */}
                    <span className="text-2xl icon-custom">GGA:ME</span>
                </div>

                {/* 메인 */}
                <div className="space-y-3">
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            borderColor: isActive('/main') ? '#ffffff' : 'transparent',
                            borderWidth: isActive('/main') ? 2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center space-x-2 px-2 py-1 rounded-full"
                    >
                        <NavLink to="/main" className="flex items-center space-x-2">
                            <img
                                id="gameIcon"
                                src={isActive('/main') ? '/Gameicon.gif' : '/Gameicon.png'}
                                className="transition-all duration-300 ease-in-out"
                                style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                                alt="Game Icon"
                            />
                            <span className={style.neonNormal}>Main</span>
                        </NavLink>
                    </motion.div>

                    {/* 서치 */}
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            borderColor: isActive('/search') ? '#ffffff' : 'transparent',
                            borderWidth: isActive('/search') ? 2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center space-x-2 px-2 py-1 rounded-full"
                    >
                        <NavLink to="/search" className="flex items-center space-x-2">
                            <img
                                id="searchIcon"
                                src={isActive('/search') ? '/SearchIcon.gif' : '/SearchIcon.png'}
                                className="transition-all duration-300 ease-in-out"
                                style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                                alt="Search Icon"
                            />
                            <span className={style.neonNormal}>Search</span>
                        </NavLink>
                    </motion.div>

                    {/* 핫토픽 */}
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            borderColor: isActive('/topic') ? '#ffffff' : 'transparent',
                            borderWidth: isActive('/topic') ? 2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center space-x-2 px-2 py-1 rounded-full"
                    >
                        <NavLink to="/topic" className="flex items-center space-x-2">
                            <img
                                id="hotTopicIcon"
                                src={isActive('/topic') ? '/FireIcon.gif' : '/FireIcon.png'}
                                className="transition-all duration-300 ease-in-out"
                                style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                                alt="HotTopic Icon"
                            />
                            <span className={style.neonNormal}>Hot Topic</span>
                        </NavLink>
                    </motion.div>

                    {/* 프로필 */}
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            borderColor: isActive('/myPage') ? '#ffffff' : 'transparent',
                            borderWidth: isActive('/myPage') ? 2 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center space-x-2 px-2 py-1 rounded-full"
                    >
                        <NavLink to="/myPage" className="flex items-center space-x-2">
                            <img
                                id="profileIcon"
                                src={isActive('/myPge') ? '/ProfileIcon.gif' : '/ProfileIcon.png'}
                                className="transition-all duration-300 ease-in-out"
                                style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                                alt="Profile Icon"
                            />
                            <span className={style.neonNormal}>My Page</span>
                        </NavLink>
                    </motion.div>

                    {/* 로그인 */}
                    <motion.div>
                        <NavLink to="/login" className={({ isActive }) => isActive ? "flex items-center space-x-2 border border-white px-2 py-1 rounded-full" : "flex items-center space-x-2 "}
                        >
                            <img
                                id="loginIcon"
                                src='/LoginIcon.png'
                                className="transition-all duration-300 ease-in-out"
                                style={{ width: '30px', height: 'auto', filter: "brightness(0) invert(1)" }}
                                alt="Login Icon"
                            />
                            <span className={`${style.neonNormal}`}>Login</span>
                        </NavLink>
                    </motion.div>
                </div>
            </div>
        </>

    );
}
export default Navbar;
