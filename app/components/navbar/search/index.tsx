'use client';

import styles from './style.module.scss';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useSearchParams } from 'next/navigation';
import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const endDate = params?.get('endDate');
  const startDate = params?.get('startDate');
  const guestCount = params?.get('guestCount');
  const locationValue = params?.get('locationValue');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return 'Add Guests';
  }, [guestCount]);

  return (
    <div onClick={searchModal.onOpen} className={styles.search}>
      <div className={styles['search__container']}>
        <div className={styles['search__location']}>{locationLabel}</div>
        <div className={styles['search__duration']}>{durationLabel}</div>
        <div className={styles['search__guests-wrapper']}>
          <div className={styles['search__guests']}>{guestLabel}</div>
          <div className={styles['search__icon-wrapper']}>
            <BiSearch size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
