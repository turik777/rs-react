import { type FC, useState, useEffect } from 'react';
import Search from '../Search/Search';
import Result from '../Result/Result';
import {
  getAllCharacters,
  getTotalPages,
  searchCharacters,
} from '../../utils/api';
import type { Character } from '../../interface/interface';
import Button from '../Button/Button';
import styles from './page.module.scss';
import Pagination from '../Pagination.tsx/Pagination';

const Page: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [throwError, setThrowError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const query = localStorage.getItem('search_3iq6e') || '';

  useEffect(() => {
    fetchCharacters(() => getAllCharacters());
  }, []);

  useEffect(() => {
    fetchCharacters(() => searchCharacters(query, page));
    getTotalPages(query).then((value) => setTotalPages(value));
  }, [query, page]);

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
    setPage(1);
    await fetchCharacters(() => searchCharacters(value));
  };

  const handlePageChange = async (page: number) => {
    setPage(page);
  };

  if (throwError) {
    throw new Error('Test render error.');
  }

  return (
    <div className={styles.page}>
      <Search search={handleSearch} />
      {!loading && characters.length > 0 && (
        <Pagination
          page={page}
          pageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
      <Result result={characters} loading={loading} error={error} />
      <Button color="error" onClick={() => setThrowError(true)}>
        Throw Error
      </Button>
    </div>
  );
};

export default Page;
