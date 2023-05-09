'use client';

import styles from './style.module.scss';
import { FC, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { TripsClientProps } from '@/app/interfaces/trips/tripsClient';
import Container from '@/app/components/container';
import Heading from '@/app/components/modals/modal/heading';
import { toast } from 'react-hot-toast';
import ListingCard from '../../listings/listingCard';

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const [deletingId, setDeletingId] = useState('');
  const router = useRouter();

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
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
      <Heading
        title='Trips'
        subtitle='Where have you been and where are you going?'
      />
      <div className={styles['trips']}>
        {reservations.map((reservation) => (
          <ListingCard
            onAction={onCancel}
            key={reservation.id}
            actionId={reservation.id}
            reservation={reservation}
            currentUser={currentUser}
            data={reservation.listing}
            actionLabel='Cancel reservation'
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
