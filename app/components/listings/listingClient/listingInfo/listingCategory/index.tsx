'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { ListingCategoryProps } from '@/app/interfaces/listings/listingCategory';

const ListingCategory: FC<ListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className={styles['listing-category']}>
      <div className={styles['listing-category__content']}>
        <Icon className={styles['listing-category__icon']} size={40} />
        <div className={styles['listing-category__info']}>
          <div className={styles['listing-category__info-label']}>{label}</div>
          <div className={styles['listing-category__info-description']}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
