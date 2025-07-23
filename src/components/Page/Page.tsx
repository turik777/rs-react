import { type FC, useState, useEffect } from 'react';
import Search from '../Search/Search';
import Result from '../Result/Result';
import { getAllCharacters, searchCharacters } from '../../utils/api';
import type { Character } from '../../interface/interface';
import Button from '../Button/Button';
import styles from './page.module.scss';

const Page: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [throwError, setThrowError] = useState(false);

  const query = localStorage.getItem('search_3iq6e') || '';

  useEffect(() => {
    if (query) {
      fetchCharacters(() => searchCharacters(query));
    } else {
      fetchCharacters(() => getAllCharacters());
    }
  }, [query]);

  const fetchCharacters = async (apiCall: () => Promise<Character[]>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall();
      setCharacters(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value: string) => {
    await fetchCharacters(() => searchCharacters(value));
  };

  if (throwError) {
    throw new Error('Test render error.');
  }

  return (
    <div className={styles.page}>
      <Search search={handleSearch} />
      <Result result={characters} loading={loading} error={error} />
      <Button color="error" onClick={() => setThrowError(true)}>
        Throw Error
      </Button>
    </div>
  );
};

export default Page;
