'use client';

import styles from './style.module.scss';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Modal from '../modal';
import Heading from '@/app/shared/ui/heading';
import Input from '@/app/shared/ui/input';
import CategoryInput from '../../inputs/categoryInput';
import CountrySelect from '@/app/shared/ui/countrySelect';
import ImageUpload from '../../inputs/imageUpload';
import Counter from '../../inputs/counter';
import { CATEGORIES } from '@/app/constants';
import { useRentModal } from '@/app/shared/model/hooks/useModal';
import { toast } from 'react-hot-toast';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const router = useRouter();
  const rentModal = useRentModal();

  const {
    reset,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      imageSrc: '',
      category: '',
      description: '',
      location: null,
      price: 1,
      roomCount: 1,
      guestCount: 1,
      bathroomCount: 1,
    },
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () => dynamic(() => import('@/app/shared/ui/map'), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  const secondaryAction = step === STEPS.CATEGORY ? undefined : onBack;

  let bodyContent = (
    <div className={styles['rent-modal-body']}>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div className={styles['rent-modal-categories']}>
        {CATEGORIES.map((item) => (
          <div key={item.label} className={styles['rent-modal-category']}>
            <CategoryInput
              onClick={(value) => setCustomValue('category', value)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className={styles['rent-modal-body']}>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className={styles['rent-modal-body']}>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenities do you have?'
        />
        <Counter
          title='Guests'
          subtitle='How many guests do you allow?'
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you have?'
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='rent-modal-body'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className={styles['rent-modal-body']}>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best'
        />
        <Input
          id='title'
          label='Title'
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          errors={errors}
          register={register}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className={styles['rent-modal-body']}>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          errors={errors}
          register={register}
          type='number'
          disabled={isLoading}
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      title='Airbnb your home!'
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      secondaryAction={secondaryAction}
    />
  );
};

export default RentModal;
