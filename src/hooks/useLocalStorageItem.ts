import { useCallback, useEffect, useState } from "react";

import { tryParse } from "../libs/tryParse";

/**
 *  * Custom hook to manage a localStorage item with React state synchronization.
 *
 *
 * @param {string} key Key to store in localStorage.
 * @param {*} blankValue Blank value to use before mounting.
 * @param {*} [initialValue] Value to fill in if not already stored.
 * @returns {[*, Function]} Item and a function to update it.
 * @remarks
 * This does not attempt to retrieve from localStorage immediately,
 * as doing so would cause a React SSR/client hydration mismatch.
 */

export function useLocalStorageItem<T>(
  key: string,
  blankValue: T,
  initialValue: T = blankValue
): [T, (value: T) => void] {
  const [item, setItem] = useState(blankValue);

  useEffect(() => {
    // TO DO: FIX ME LATER 🤔 USED ! BELOW ;
    setItem(tryParse(localStorage.getItem(key)!) ?? initialValue);
  }, [initialValue, key]);

  const updateItem = useCallback(
    (value) => {
      setItem(value);
      localStorage.setItem(key, value); // 🤔
    },
    [key]
  );

  return [item, updateItem];
}
