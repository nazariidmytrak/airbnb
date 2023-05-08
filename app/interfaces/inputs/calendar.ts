import { Range, RangeKeyDict } from 'react-date-range';

export interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}
