'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { FC } from 'react';
import { AvatarProps } from '@/app/interfaces/navbar/avatar';

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className={styles.avatar}
      src={src || '/images/placeholder.webp'}
      height='30'
      width='30'
      alt='Avatar'
    />
  );
};

export default Avatar;
