'use client';

import styles from './style.module.scss';
import Container from '../container';
import Logo from './logo';
import Search from './search';
import UserMenu from './userMenu';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles['navbar__container']}>
        <Container>
          <div className={styles['navbar__content']}>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
