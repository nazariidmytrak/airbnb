'use client';

import styles from './style.module.scss';
import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      className={styles.avatar}
      src='/images/placeholder.webp'
      height='30'
      width='30'
      alt='Avatar'
    />
  );
};

export default Avatar;
