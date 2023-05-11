import { create } from 'zustand';

import { HookModalProps } from '@/app/interfaces/modals/hookModal';

const createModalHook = (initialState: Partial<HookModalProps>) =>
  create<HookModalProps>((set) => ({
    isOpen: initialState.isOpen || false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

const useLoginModal = createModalHook({ isOpen: false });
const useRegisterModal = createModalHook({ isOpen: false });
const useRentModal = createModalHook({ isOpen: false });
const useSearchModal = createModalHook({ isOpen: false });

export { useLoginModal, useRegisterModal, useRentModal, useSearchModal };
