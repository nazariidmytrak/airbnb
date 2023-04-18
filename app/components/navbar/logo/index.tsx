'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      className={styles.logo}
      src='/images/logo.webp'
      height='100'
      width='100'
      alt='Logo'
    />
  );
};

export default Logo;
