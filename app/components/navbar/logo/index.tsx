'use client';

import styles from './style.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      className={styles.logo}
      src='/images/logo.webp'
      priority
      height='100'
      width='100'
      alt='Logo'
    />
  );
};

export default Logo;
