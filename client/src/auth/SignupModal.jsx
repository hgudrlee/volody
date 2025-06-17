import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Modal.module.css";

// lucide-react 아이콘 임포트
import { X, ArrowLeft } from "lucide-react";

import emailIcon from "/email-login.png";
import googleIcon from "/google-login.png";
import naverIcon from "/naver-login.png";
import kakaoIcon from "/kakao-login.png";

const SignupModal = ({ onClose, onSwitch }) => {
  const [step, setStep] = useState("menu"); // "menu" 또는 "email"
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === "email") {
      inputRef.current?.focus();
    }
  }, [step]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${API_BASE_URL}/users/signup`, formData);
    try {
      await axios.post(`${API_BASE_URL}/users/signup`, formData);
      alert("회원가입 성공! 로그인 해주세요.");
      onClose(); // 또는 onSwitch();
    } catch (error) {
      alert(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} /> {/* lucide-react X 아이콘 */}
        </button>
        <div className={styles.modalHeader}>
          {step === "email" && (
            <button
              className={styles.backButton}
              onClick={() => setStep("menu")}
            >
              <ArrowLeft size={24} /> {/* lucide-react ArrowLeft 아이콘 */}
            </button>
          )}
          <h2 className={styles.title}>
            {step === "menu" ? "회원가입" : "이메일로 가입하기"}
          </h2>
        </div>

        {step === "menu" ? (
          <>
            <div className={styles.socialButtons}>
              <button
                className={`${styles.socialButton} ${styles.email}`}
                onClick={() => setStep("email")}
              >
                <img
                  src={emailIcon}
                  alt="email"
                  className={styles.socialIcon}
                />
                이메일로 가입하기
              </button>
              <button className={`${styles.socialButton} ${styles.google}`}>
                <img
                  src={googleIcon}
                  alt="google"
                  className={styles.socialIcon}
                />
                구글로 가입하기
              </button>
              <button className={`${styles.socialButton} ${styles.naver}`}>
                <img
                  src={naverIcon}
                  alt="naver"
                  className={styles.socialIcon}
                />
                네이버로 가입하기
              </button>
              <button className={`${styles.socialButton} ${styles.kakao}`}>
                <img
                  src={kakaoIcon}
                  alt="kakao"
                  className={styles.socialIcon}
                />
                카카오로 가입하기
              </button>
            </div>
            <p className={styles.footerText}>
              이미 회원이신가요?{" "}
              <button className={styles.link} onClick={onSwitch}>
                로그인
              </button>
            </p>
          </>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.inputLabel}>
                사용자 이름
              </label>
              <input
                id="username"
                type="text"
                name="username"
                className={styles.input}
                value={formData.username}
                onChange={handleChange}
                placeholder="사용자 이름을 입력하세요"
                ref={inputRef}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                이메일
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                placeholder="영문, 숫자 포함 8자 이상"
                required
              />
            </div>

            <button type="submit" className={styles.button}>
              회원가입
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
