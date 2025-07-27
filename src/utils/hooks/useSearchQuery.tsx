import { useState, useEffect } from 'react';

export const useStoredQuery = (
  key: string
): [string, (query: string) => void, () => void] => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const storedQuery = localStorage.getItem(key);
    if (storedQuery !== null) {
      setQuery(storedQuery);
    }
  }, [key]);

  const saveQuery = () => {
    localStorage.setItem(key, query);
  };

  return [query, setQuery, saveQuery];
};

export default useStoredQuery;
