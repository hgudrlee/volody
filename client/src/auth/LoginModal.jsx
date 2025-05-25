import { useState, useRef, useEffect } from "react";
import axios from "axios";
import useUserStore from "../stores/useUserStore";
import styles from "./Modal.module.css";
import { X, ArrowLeft } from "lucide-react";

import emailIcon from "/email-login.png";
import googleIcon from "/google-login.png";
import naverIcon from "/naver-login.png";
import kakaoIcon from "/kakao-login.png";
import SocialLoginButton from "./SocialLoginButton";
import EmailLoginForm from "./EmailLoginForm";

const LoginModal = ({ onClose, onSwitch }) => {
  const { setUser } = useUserStore();
  const [step, setStep] = useState("menu"); // "menu" 또는 "email"

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleEmailLoginSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/auth/login", formData);
      localStorage.setItem("token", res.data.token);

      const profileRes = await axios.get("http://localhost:5001/users/me", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });

      setUser(profileRes.data.data);
      alert("로그인 성공!");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/auth/google";
  };

  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:5001/auth/kakao";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:5001/auth/naver";
  };

  const handleEmailLogin = () => {
    setStep("email");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className={styles.modalHeader}>
          {step === "email" && (
            <button
              className={styles.backButton}
              onClick={() => setStep("menu")}
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <h2 className={styles.title}>
            {step === "menu" ? "로그인" : "이메일로 로그인하기"}
          </h2>
        </div>

        {step === "menu" ? (
          <>
            <div className={styles.socialButtons}>
              <SocialLoginButton
                provider="email"
                icon={emailIcon}
                onClick={handleEmailLogin}
                label="이메일로 로그인하기"
              />
              <SocialLoginButton
                provider="google"
                icon={googleIcon}
                onClick={handleGoogleLogin}
                label="구글로 로그인하기"
              />
              <SocialLoginButton
                provider="naver"
                icon={naverIcon}
                onClick={handleNaverLogin}
                label="네이버로 로그인하기"
              />
              <SocialLoginButton
                provider="kakao"
                icon={kakaoIcon}
                onClick={handleKakaoLogin}
                label="카카오로 로그인하기"
              />
            </div>
            <p className={styles.footerText}>
              아직 회원이 아니신가요?{" "}
              <button className={styles.link} onClick={onSwitch}>
                회원가입
              </button>
            </p>
          </>
        ) : (
          <EmailLoginForm onSubmit={handleEmailLoginSubmit} />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
