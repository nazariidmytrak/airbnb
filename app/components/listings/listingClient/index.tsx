'use client';

import styles from './style.module.scss';
import { FC, useMemo } from 'react';
import { ListingClientProps } from '@/app/interfaces/listings/listingClient';
import { CATEGORIES } from '@/app/constants';
import Container from '../../container';
import ListingHead from './listingHead';
import ListingInfo from './listingInfo';

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <div>
      <Container>
        <div className={styles['listing']}>
          <div className={styles['listing__content']}>
            <ListingHead
              id={listing.id}
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              currentUser={currentUser}
            />
            <div className={styles['listing__about']}>
              <ListingInfo
                user={listing.user}
                category={category}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                description={listing.description}
                locationValue={listing.locationValue}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListingClient;
