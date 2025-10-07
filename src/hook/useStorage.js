import { useState, useEffect, useCallback } from "react";
import { storeData, getData, removeData } from "../utils/StorageData";

export const useStorage = (key, initialValue = null) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  // Load dữ liệu khi mount
  useEffect(() => {
    loadValue();
  }, [key]);

  const loadValue = async () => {
    try {
      setLoading(true);
      const value = await getData(key);
      setStoredValue(value !== null ? value : initialValue);
    } catch (error) {
      setStoredValue(initialValue);
    } finally {
      setLoading(false);
    }
  };

  // Set value
  const setValue = useCallback(
    async (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        await storeData(key, valueToStore);
      } catch (error) {
        console.error("Error saving to storage:", error);
      }
    },
    [key, storedValue]
  );

  // Remove value
  const removeValue = useCallback(async () => {
    try {
      await removeData(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing from storage:", error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue, loading];
};
