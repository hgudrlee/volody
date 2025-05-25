// hooks/useAuth.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../stores/useUserStore";

function useAuth() {
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    let token;

    // 1. 쿼리에서 토큰 확인 (구글 로그인 콜백)
    const params = new URLSearchParams(location.search);
    const paramToken = params.get("token");

    if (paramToken) {
      token = paramToken;
      localStorage.setItem("token", token); // 저장
      window.history.replaceState({}, document.title, location.pathname); // 쿼리 제거
    } else {
      // 2. 이메일 로그인 시 localStorage에서 가져옴
      token = localStorage.getItem("token");
    }

    if (token) {
      setToken(token);
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("JWT 디코딩 실패:", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    }
  }, [location]); // ⬅ location 전체 감지 (검색 쿼리 외에도 pathname 등 변화 포함)
}

export default useAuth;
