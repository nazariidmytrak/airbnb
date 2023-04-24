'use client';

import styles from './style.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useCallback } from 'react';
import qs from 'query-string';
import { CategoryBoxProps } from '@/app/interfaces/navbar/categoryBox';

const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`${styles['category-box']} ${selected && styles.selected}`}
    >
      <Icon size={26} />
      <div className={styles['category-box__label ']}>{label}</div>
    </div>
  );
};

export default CategoryBox;
