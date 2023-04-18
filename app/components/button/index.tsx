'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { ButtonProps } from '@/app/interfaces/button';

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  small,
  outline,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} 
      ${outline && styles.outline} 
      ${small && styles.small}`}
    >
      {Icon && <Icon size={24} className={styles.button__icon} />}
      {label}
    </button>
  );
};

export default Button;
