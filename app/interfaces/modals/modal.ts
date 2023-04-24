import { ReactElement } from 'react';

export interface ModalProps {
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  secondaryActionLabel?: string;
  body?: ReactElement;
  footer?: ReactElement;
  secondaryAction?: () => void;
}
