'use client';

import styles from './style.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import Modal from '../modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../modal/heading';
import CategoryInput from '../../inputs/categoryInput';
import { CATEGORIES } from '@/app/constants';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
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
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  const category = watch('category');

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
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel={actionLabel}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      isOpen={rentModal.isOpen}
      title='Airbnb your home!'
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      secondaryAction={secondaryAction}
    />
  );
};

export default RentModal;
