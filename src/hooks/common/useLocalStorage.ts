import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface UseLocalStorage<T> {
  key: string;
  defaultValue: T;
}

type UseLocalStorageReturn<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorage<T>): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : defaultValue;
    } catch (error) {
      console.error("Error retrieving from local storage:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting to local storage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
