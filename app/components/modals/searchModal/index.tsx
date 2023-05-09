'use client';

import styles from './style.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import { useState, useMemo, useCallback } from 'react';
import Modal from '../modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import dynamic from 'next/dynamic';
import { CountrySelectValue } from '@/app/interfaces/inputs/countrySelect';
import Heading from '../modal/heading';
import CountrySelect from '../../inputs/countrySelect';
import Calendar from '../../inputs/calendar';
import Counter from '../../inputs/counter';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const Map = useMemo(
    () => dynamic(() => import('../rentModal/map/'), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      roomCount,
      guestCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    router,
    params,
    step,
    searchModal,
    location,
    roomCount,
    guestCount,
    bathroomCount,
    dateRange,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [step]);

  const secondaryAction = step === STEPS.LOCATION ? undefined : onBack;

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className={styles['search-modal-body']}>
      <Heading
        title='Where would you like to go?'
        subtitle='Find the perfect location'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className={styles['search-modal-body']}>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className={styles['search-modal-body']}>
        <Heading title='More information' subtitle='Find your perfect place' />
        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      isOpen={searchModal.isOpen}
      title='Filters'
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      secondaryAction={secondaryAction}
    />
  );
};

export default SearchModal;
