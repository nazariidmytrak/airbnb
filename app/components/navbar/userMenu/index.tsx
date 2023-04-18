'use client';

import styles from './style.module.scss';
import { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './menuItem';
import Avatar from '../../avatar';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const UserMenu = () => {
  const { onOpen } = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, [setIsOpen]);

  return (
    <div className={styles['user-actions']}>
      <div className={styles['user-actions__content']}>
        <button onClick={() => {}} className={styles['user-actions__button']}>
          Airbnb your home
        </button>
        <div onClick={toggleOpen} className={styles['user-actions__menu']}>
          <AiOutlineMenu />
          <div className={styles['user-actions__avatar-wrapper']}>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles['user-actions__dropdown']}>
          <div className={styles['user-actions__dropdown-content']}>
            <>
              <MenuItem label='Login' onClick={() => {}} />
              <MenuItem label='Sign up' onClick={onOpen} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
