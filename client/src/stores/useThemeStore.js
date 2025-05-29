import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    set({ theme });
  },
}));

export default useThemeStore;
