'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import { ListingReservationProps } from '@/app/interfaces/listings/listingReservation';
import Calendar from '@/app/shared/ui/calendar';
import Button from '@/app/shared/ui/button';

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  disabled,
  disabledDates,
  onSubmit,
  onChangeDate,
}) => {
  return (
    <div className={styles['listing-reservation']}>
      <div className={styles['listing-reservation__header']}>
        <div className={styles['listing-reservation__header-price']}>
          $ {price}
        </div>
        <div className={styles['listing-reservation__header-text']}>night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className={styles['listing-reservation__btn']}>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>
      <div className={styles['listing-reservation__total']}>
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
