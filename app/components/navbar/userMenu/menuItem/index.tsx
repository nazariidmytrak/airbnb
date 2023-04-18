'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { MenuItemProps } from '@/app/interfaces/menuItem';

const MenuItem: FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div onClick={onClick} className={styles['menu-item']}>
      {label}
    </div>
  );
};

export default MenuItem;
