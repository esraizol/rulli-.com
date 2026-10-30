import { create } from 'zustand';

interface UIStore {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isLoading: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  setLoading: (isLoading) => set({ isLoading }),
}));
