'use client';

import styles from './style.module.scss';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { ListingInfoProps } from '@/app/interfaces/listings/listingInfo';
import useCountries from '@/app/shared/model/hooks/useCountries';
import Avatar from '@/app/shared/ui/avatar';
import ListingCategory from './listingCategory';

const Map = dynamic(() => import('@/app/shared/ui/map'), {
  ssr: false,
});

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className={styles['listing-info']}>
      <div className={styles['listing-info__header']}>
        <div className={styles['listing-info__header-top']}>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className={styles['listing-info__header-bottom']}>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className={styles['listing-info__description']}>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
