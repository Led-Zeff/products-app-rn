import { useState } from 'react';

export const useForm = <T extends Object>(initState: T) => {
  const [value, setValue] = useState(initState);

  const onChange = <K extends Object>(val: K, field: keyof T) => {
    setValue({ ...value, [field]: val });
  };

  return { value, onChange };
};
