'use client';

import styles from './style.module.scss';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles['search__container']}>
        <div className={styles['search__anywhere']}>Anywhere</div>
        <div className={styles['search__anyweek']}>Any Week</div>
        <div className={styles['search__xz']}>
          {/*  //!SEARCH XZ */}
          <div className={styles['search__guests']}>Add guests</div>
          <div className={styles['search__icon-wrapper']}>
            <BiSearch size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
