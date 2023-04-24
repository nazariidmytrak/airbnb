'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import Container from '../container';
import Logo from './logo';
import Search from './search';
import UserMenu from './userMenu';
import { NavbarProps } from '@/app/interfaces/navbar';

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className={styles.navbar}>
      <div className={styles['navbar__container']}>
        <Container>
          <div className={styles['navbar__content']}>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
