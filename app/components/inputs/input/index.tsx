'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { BiDollar } from 'react-icons/bi';
import { InputProps } from '@/app/interfaces/inputs/input';

const Input: FC<InputProps> = ({
  id,
  label,
  errors,
  register,
  type = 'text',
  disabled,
  required,
  formatPrice,
}) => {
  return (
    <div className={styles['input-wrapper']}>
      {formatPrice && <BiDollar size={24} className={styles['input-icon']} />}
      <input
        className={`${styles['input']} 
        ${formatPrice && styles.hasPrice} 
        ${errors[id] && styles.error} 
        peer`}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder=' '
      />
      <label
        className={`${styles['label']}
        ${formatPrice && styles.hasPrice}
        ${errors[id] && styles.error}
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0
        peer-focus: scale-75 
        peer-focus:-translate-y-4`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
