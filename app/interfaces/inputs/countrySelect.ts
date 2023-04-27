export type CountrySelectValue = {
  flag: string;
  value: string;
  region: string;
  latlng: number[];
  label: string;
};

export interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
