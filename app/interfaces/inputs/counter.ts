export interface CounterProps {
  title: string;
  value: number;
  subtitle: string;
  onChange: (value: number) => void;
}
