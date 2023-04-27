'use client';

import styles from './style.module.scss';
import { FC, useCallback } from 'react';
import { CounterProps } from '@/app/interfaces/inputs/counter';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Counter: FC<CounterProps> = ({ title, value, subtitle, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className={styles['counter']}>
      <div className={styles['counter-info']}>
        <div className={styles['counter-info__title']}>{title}</div>
        <div className={styles['counter-info__subtitle ']}>{subtitle}</div>
      </div>
      <div className={styles['counter-actions']}>
        <div onClick={onReduce} className={styles['counter-actions__button']}>
          <AiOutlineMinus />
        </div>
        <div className='font-light text-xl text-neutral-600'>{value}</div>
        <div onClick={onAdd} className={styles['counter-actions__button']}>
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
