import { create } from 'zustand';

import { RegisterModalProps } from '../interfaces/modals/registerModal';

const useRegisterModal = create<RegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
