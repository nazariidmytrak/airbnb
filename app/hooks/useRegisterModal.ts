import { create } from 'zustand';

import { HookModalProps } from '../interfaces/modals/hookModal';

const useRegisterModal = create<HookModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
