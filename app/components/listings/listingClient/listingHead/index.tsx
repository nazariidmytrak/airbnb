'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { ListingHeadProps } from '@/app/interfaces/listings/listingHead';
import useCountries from '@/app/hooks/useCountries';
import Heading from '@/app/components/modals/modal/heading';
import Image from 'next/image';
import HeartButton from '../../listingCard/heartButton';

const ListingHead: FC<ListingHeadProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className={styles['listing-head']}>
        <Image
          className={styles['listing-head__img']}
          src={imageSrc}
          fill
          alt='image'
        />
        <div className={styles['listing-head__icon']}>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
