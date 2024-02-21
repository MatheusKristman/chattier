import { create } from "zustand";

interface IUseContactStore {
  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  isNewConversationModalOpen: boolean;
  openNewConversationModal: () => void;
  closeNewConversationModal: () => void;
}

const useContactStore = create<IUseContactStore>((set) => ({
  isProfileModalOpen: false,
  openProfileModal: () => set({ isProfileModalOpen: true }),
  closeProfileModal: () => set({ isProfileModalOpen: false }),
  isNewConversationModalOpen: false,
  openNewConversationModal: () => set({ isNewConversationModalOpen: true }),
  closeNewConversationModal: () => set({ isNewConversationModalOpen: false }),
}));

export default useContactStore;
