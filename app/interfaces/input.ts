import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

export interface InputProps {
  id: string;
  label: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  formatPrice?: boolean;
}
