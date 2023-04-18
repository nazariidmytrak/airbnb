'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { ContainerProps } from '@/app/interfaces/container';

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
