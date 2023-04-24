'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { CategoryInputProps } from '@/app/interfaces/inputs/categoryInput';

const CategoryInput: FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`${styles['category-input']} ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      <Icon size={30} />
      <div className={styles['category-input__label']}>{label}</div>
    </div>
  );
};

export default CategoryInput;
