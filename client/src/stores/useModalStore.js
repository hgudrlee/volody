import { create } from "zustand";

const useModalStore = create((set) => ({
  // 모달 상태
  showLogin: false,
  showSignup: false,

  // 모달 열기 함수들
  openLoginModal: () => set({ showLogin: true, showSignup: false }),
  openSignupModal: () => set({ showSignup: true, showLogin: false }),

  // 모달 닫기
  closeModals: () => set({ showLogin: false, showSignup: false }),

  // 모달 전환
  switchToSignup: () => set({ showLogin: false, showSignup: true }),
  switchToLogin: () => set({ showSignup: false, showLogin: true }),
}));

export default useModalStore;