'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import {
  CountrySelectProps,
  CountrySelectValue,
} from '@/app/interfaces/inputs/countrySelect';
import useCountries from '@/app/hooks/useCountries';

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll, getByValue } = useCountries();
  return (
    <div>
      <Select
        value={value}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
        isClearable
        options={getAll()}
        placeholder='Anywhere'
        onChange={(value) => onChange(value as CountrySelectValue)}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        formatOptionLabel={(option: any) => (
          <div className={styles['select-label']}>
            <ReactCountryFlag
              className={styles['select-label__flag']}
              svg
              aria-label={option.label}
              countryCode={option.value}
            />
            <div>
              {option.label},
              <span className={styles['select-label__region']}>
                {option.region}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default CountrySelect;
