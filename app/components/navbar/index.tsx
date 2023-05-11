'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import Container from '@/app/shared/ui/container';
import Logo from '@/app/shared/ui/logo';
import Search from './search';
import UserMenu from './userMenu';
import Categories from './categories';
import { NavbarProps } from '@/app/interfaces/navbar/navbar';

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
      <Categories />
    </div>
  );
};

export default Navbar;
