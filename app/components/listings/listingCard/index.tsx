'use client';

import styles from './style.module.scss';
import { FC, useCallback, MouseEvent, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ListingCardProps } from '@/app/interfaces/listings/listingCard';
import useCountries from '@/app/shared/model/hooks/useCountries';
import HeartButton from '@/app/shared/ui/heart-button';
import Button from '@/app/shared/ui/button';

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  actionId = '',
  actionLabel,
  currentUser,
  onAction,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className={`${styles['listing-card']} group`}
    >
      <div className={styles['listing-card__content']}>
        <div className={styles['listing-card__image-wrapper']}>
          <Image
            className={`${styles['listing-card__image']} group-hover:scale-110`}
            fill
            src={data.imageSrc}
            alt='Listing'
          />
          <div className={styles['listing-card__icon']}>
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className={styles['listing-card__location']}>
          {location?.region}, {location?.label}
        </div>
        <div className={styles['listing-card__category']}>
          {reservationDate || data.category}
        </div>
        <div className={styles['listing-card__price']}>
          <div className={styles['listing-card__price-value']}>${price}</div>
          {!reservation && (
            <div className={styles['listing-card__price-label']}>night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            onClick={handleCancel}
            disabled={disabled}
            small
            label={actionLabel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
