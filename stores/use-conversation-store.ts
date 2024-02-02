import { create } from "zustand";

interface IUseConversationStore {
  isGalleryOpen: boolean;
  openGallery: () => void;
  closeGallery: () => void;
}

const useConversationStore = create<IUseConversationStore>((set) => ({
  isGalleryOpen: false,
  openGallery: () => set({ isGalleryOpen: true }),
  closeGallery: () => set({ isGalleryOpen: false }),
}));

export default useConversationStore;
