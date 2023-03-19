import { create } from "zustand";

export interface ModalStoreInterface {
  isOpen: boolean;
  movieId?: string;
  closeModal: () => void;
  openModel: (movieId: string) => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  closeModal: () => set({ isOpen: false, movieId: undefined }),
  openModel: (movieId: string) => set({ isOpen: true, movieId }),
}));

export default useInfoModal;
