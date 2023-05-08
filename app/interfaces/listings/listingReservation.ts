import { Range } from 'react-date-range';

export interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  disabled?: boolean;
  disabledDates: Date[];
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
}
