import { create } from 'zustand';

import { LoginModalProps } from '../interfaces/modals/loginModal';

const useLoginModal = create<LoginModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
