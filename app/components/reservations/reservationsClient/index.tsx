'use client';

import styles from './style.module.scss';
import axios from 'axios';
import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Heading from '../../modals/modal/heading';
import Container from '../../container';
import ListingCard from '../../listings/listingCard';
import { ReservationClientProps } from '@/app/interfaces/reservations/reservationClient';

const ReservationsClient: FC<ReservationClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancelled');
          router.refresh();
        })
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className={styles['reservations']}>
        {reservations.map((reservation) => (
          <ListingCard
            onAction={onCancel}
            key={reservation.id}
            currentUser={currentUser}
            actionId={reservation.id}
            reservation={reservation}
            data={reservation.listing}
            actionLabel='Cancel guest reservation'
            disabled={deletingId === reservation.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
