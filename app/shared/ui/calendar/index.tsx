'use client';

import { FC } from 'react';
import { CalendarProps } from '@/app/interfaces/inputs/calendar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Calendar: FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      minDate={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      rangeColors={['#262626']}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
