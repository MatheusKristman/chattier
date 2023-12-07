import { create } from "zustand";

interface IUseHeaderStore {
    isMobileMenuOpen: boolean;
    openMobileMenu: () => void;
    closeMobileMenu: () => void;
}

export const useHeaderStore = create<IUseHeaderStore>((set) => ({
    isMobileMenuOpen: false,
    openMobileMenu: () => set({ isMobileMenuOpen: true }),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
