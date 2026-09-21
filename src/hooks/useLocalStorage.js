import { useState, useEffect } from 'react';
import { safeParse, setStorage } from '@/utils/storage';

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => safeParse(key, initial));

  useEffect(() => {
    setStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}