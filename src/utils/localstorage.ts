// utils/localstorage.ts

export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
