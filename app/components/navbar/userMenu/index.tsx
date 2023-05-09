'use client';

import styles from './style.module.scss';
import { signOut } from 'next-auth/react';
import { FC, useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MenuItem from './menuItem';
import Avatar from '../../avatar';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { UserMenuProps } from '@/app/interfaces/navbar/userMenu';
import { useRouter } from 'next/navigation';

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((current) => !current);
  }, [setIsOpen]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className={styles['user-actions']}>
      <div className={styles['user-actions__content']}>
        <button onClick={onRent} className={styles['user-actions__button']}>
          Airbnb your home
        </button>
        <div onClick={toggleOpen} className={styles['user-actions__menu']}>
          <AiOutlineMenu />
          <div className={styles['user-actions__avatar-wrapper']}>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles['user-actions__dropdown']}>
          <div className={styles['user-actions__dropdown-content']}>
            {currentUser ? (
              <>
                <MenuItem
                  label='My trips'
                  onClick={() => {
                    router.push('/trips');
                  }}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => {
                    router.push('/favorites');
                  }}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => {
                    router.push('/reservations');
                  }}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => {
                    router.push('/properties');
                  }}
                />
                <MenuItem label='Airbnb my home' onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label='Logout' onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label='Login' onClick={loginModal.onOpen} />
                <MenuItem label='Sign up' onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
