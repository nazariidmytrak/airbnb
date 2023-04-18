import { MouseEvent } from 'react';
import { IconType } from 'react-icons';

export interface ButtonProps {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon?: IconType;
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
}
