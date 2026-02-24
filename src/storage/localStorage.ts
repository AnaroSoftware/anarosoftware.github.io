import type { AppMode, LanguageType } from 'src/utils/types';

export interface StorageSchema {
  language: LanguageType;
  mode: AppMode;
}

export const useLocalStorage = () => {
  const getItem = <K extends keyof StorageSchema>(key: K): StorageSchema[K] | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as StorageSchema[K];
    } catch {
      return null;
    }
  };

  const setItem = <K extends keyof StorageSchema>(key: K, value: StorageSchema[K]): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeItem = <K extends keyof StorageSchema>(key: K): void => {
    localStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};
