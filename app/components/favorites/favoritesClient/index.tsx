'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { FavoritesClientProps } from '@/app/interfaces/favorites/favoritesClient';
import Container from '@/app/shared/ui/container';
import Heading from '@/app/shared/ui/heading';
import ListingCard from '../../listings/listingCard';

const FavoritesClient: FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title='Favorites'
        subtitle='List of places you have favorited!'
      />
      <div className={styles['favorites']}>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
