'use client';

import styles from './style.module.scss';
import { FC, useMemo, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Range } from 'react-date-range';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { ListingClientProps } from '@/app/interfaces/listings/listingClient';
import { CATEGORIES } from '@/app/constants';
import Container from '../../container';
import ListingHead from './listingHead';
import ListingInfo from './listingInfo';
import useLoginModal from '@/app/hooks/useLoginModal';
import ListingReservation from './listingReservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const loginModal = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, loginModal, totalPrice, dateRange, listing?.id, router]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
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
            <ListingReservation
              price={listing.price}
              dateRange={dateRange}
              totalPrice={totalPrice}
              disabled={isLoading}
              disabledDates={disabledDates}
              onSubmit={onCreateReservation}
              onChangeDate={(value) => setDateRange(value)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
