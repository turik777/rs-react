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
import { Outlet, useSearchParams } from 'react-router';
import useSearchQuery from '../../utils/hooks/useSearchQuery';

const Page: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [throwError, setThrowError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useSearchQuery('search_3iq6e');

  const detailId = searchParams.get('details');
  const page = Number(searchParams.get('page')) || 1;

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

  const handleSearch = async (query: string) => {
    setQuery(query);
    const id = searchParams.get('details');
    if (id) {
      setSearchParams({ page: '1', details: `${id}` });
    } else {
      setSearchParams({ page: '1' });
    }
  };

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    setSearchParams(params);
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    setSearchParams(params);
  };

  if (throwError) {
    throw new Error('Test render error.');
  }

  return (
    <div
      className={styles.page}
      onClick={() => detailId && handleCloseDetails()}
    >
      <Search search={handleSearch} />
      <div
        className={styles['pagination-wrapper']}
        onClick={(event) => event.stopPropagation()}
      >
        {!loading && characters.length > 0 && (
          <Pagination
            page={page}
            pageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </div>
      <div className={styles.info}>
        <div className={styles['result-wrapper']}>
          <Result
            result={characters}
            loading={loading}
            error={error}
            page={page}
          />
        </div>
        <Outlet />
      </div>
      <Button color="error" onClick={() => setThrowError(true)}>
        Throw Error
      </Button>
    </div>
  );
};

export default Page;
