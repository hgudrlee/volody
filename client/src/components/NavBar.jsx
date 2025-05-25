import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from 'lucide-react';
import styles from "./NavBar.module.css";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import useModalStore from "../stores/useModalStore";
import useUserStore from "../stores/useUserStore";
import Avatar from "./Avatar";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Zustand stores 사용
  const {
    showLogin,
    showSignup,
    openLoginModal,
    openSignupModal,
    closeModals,
    switchToSignup,
    switchToLogin,
  } = useModalStore();

  const { user, logout } = useUserStore();

  // 모바일 화면 감지
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // 스크롤 감지하여 네비게이션 바 스타일 변경
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 프로필 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest(`.${styles.profileContainer}`)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <div className={styles.navbarContent}>
            {/* 로고 */}
            <div className={styles.logoContainer}>
              <img
                src="/volody-logo.png"
                alt="Logo"
                className={styles.logoImage}
              />
              <a href="/" className={styles.logo}>
                VOLODY
              </a>
            </div>

            {/* 데스크탑 메뉴 */}
            <div className={styles.desktopMenu}>
              <div className={styles.menuItems}>
                <a href="/convert" className={styles.menuItem}>
                  변환하기
                </a>
                <a
                  href="https://github.com/volody"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menuItem}
                >
                  GITHUB
                </a>
                <a href="/community" className={styles.menuItem}>
                  커뮤니티
                </a>
              </div>
            </div>

            {/* 로그인 상태에 따른 조건부 렌더링 */}
            {user ? (
              // 로그인된 상태: 프로필 아바타
              <div className={styles.profileContainer}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className={styles.profileButton}
                  type="button"
                >
                  <Avatar user={user} size="sm" />
                  <span className={styles.username}>{user.username}</span>
                </button>

                {/* 프로필 드롭다운 메뉴 */}
                {showProfileMenu && (
                  <div className={styles.profileDropdown}>
                    <a href="/profile" className={styles.dropdownItem}>
                      <User size={16} />
                      <span>프로필 보기</span>
                    </a>
                    <button onClick={handleLogout} className={styles.dropdownItem}>
                      <LogOut size={16} />
                      <span>로그아웃</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // 비로그인 상태: 로그인/회원가입 버튼
              <div className={styles.authButtons}>
                <button
                  onClick={openLoginModal}
                  className={styles.loginButton}
                  type="button"
                >
                  로그인
                </button>
                <button
                  onClick={openSignupModal}
                  className={styles.signupButton}
                  type="button"
                >
                  회원가입
                </button>
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <div className={styles.mobileMenuButton}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={styles.hamburgerButton}
                type="button"
                aria-expanded={isMenuOpen}
                aria-label="메뉴 열기/닫기"
              >
                <span className={styles.srOnly}>메뉴 열기</span>
                {isMenuOpen ? (
                  <X className={styles.icon} />
                ) : (
                  <Menu className={styles.icon} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobile && isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuItems}>
              <a href="/convert" className={styles.mobileMenuItem}>
                변환하기
              </a>
              <a
                href="https://github.com/volody"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileMenuItem}
              >
                GITHUB
              </a>
              <a href="/community" className={styles.mobileMenuItem}>
                커뮤니티
              </a>
            </div>

            {/* 모바일 인증 버튼 영역 */}
            <div className={styles.mobileAuthButtons}>
              {user ? (
                // 로그인된 상태: 프로필 보기 + 로그아웃
                <>
                  <a 
                    href="/profile" 
                    className={styles.mobileProfileButton}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>프로필 보기</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className={styles.mobileLogoutButton}
                    type="button"
                  >
                    <LogOut size={18} />
                    <span>로그아웃</span>
                  </button>
                </>
              ) : (
                // 비로그인 상태: 로그인/회원가입
                <>
                  <button
                    onClick={() => {
                      openLoginModal();
                      setIsMenuOpen(false);
                    }}
                    className={styles.mobileLoginButton}
                    type="button"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => {
                      openSignupModal();
                      setIsMenuOpen(false);
                    }}
                    className={styles.mobileSignupButton}
                    type="button"
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 모달 */}
      {showLogin && (
        <LoginModal onClose={closeModals} onSwitch={switchToSignup} />
      )}

      {showSignup && (
        <SignupModal onClose={closeModals} onSwitch={switchToLogin} />
      )}
    </>
  );
}