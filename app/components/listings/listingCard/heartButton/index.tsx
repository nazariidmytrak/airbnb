'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { HeartButtonProps } from '@/app/interfaces/listings/heartButton';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const hasFavorited = false;
  const toggleFavorite = () => {};
  return (
    <div onClick={toggleFavorite} className={styles['heart-button']}>
      <AiOutlineHeart className={styles['heart-button__icon']} size={28} />
      <AiFillHeart
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
        size={24}
      />
    </div>
  );
};

export default HeartButton;
