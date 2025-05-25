import { create } from "zustand";

const safeJSONParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

const useUserStore = create((set) => ({
  // 상태 초기화 시 user의 role을 체크하여 사용
  user: safeJSONParse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
    window.location.href = "/"; // 로그아웃 후 홈으로 이동
  },
}));

export default useUserStore;
