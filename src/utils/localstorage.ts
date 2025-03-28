// utils/localstorage.ts

export const getItem = (key: string): string | null => {
  const item = localStorage.getItem(key);
  return item;
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
