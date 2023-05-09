'use client';

import styles from './style.module.scss';
import { FC, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { PropertiesClientProps } from '@/app/interfaces/properties/propertiesClient';
import Container from '@/app/components/container';
import Heading from '@/app/components/modals/modal/heading';
import { toast } from 'react-hot-toast';
import ListingCard from '../../listings/listingCard';

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
      <div className={styles['properties']}>
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            key={listing.id}
            onAction={onCancel}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel='Delete property'
            disabled={deletingId === listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
