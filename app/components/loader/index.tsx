'use client';

import styles from './style.module.scss';
import { PuffLoader } from 'react-spinners';
const Loader = () => {
  return (
    <div className={styles['loader']}>
      <PuffLoader size={100} color='red' />
    </div>
  );
};

export default Loader;
