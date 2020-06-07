import { useState, ChangeEvent } from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    reset: () => setValue(''),
    setValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
  };
};
