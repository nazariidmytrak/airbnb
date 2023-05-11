'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { HeadingProps } from '@/app/interfaces/modals/heading';

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className={styles['heading-title']}>{title}</div>
      <div className={styles['heading-subtitle']}>{subtitle}</div>
    </div>
  );
};

export default Heading;
