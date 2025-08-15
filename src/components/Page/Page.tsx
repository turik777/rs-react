'use client';

import { type FC, useState } from 'react';
import Search from '../Search/Search';
import Result from '../Result/Result';
import Button from '../Button/Button';
import styles from './page.module.scss';
import Pagination from '../Pagination/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSearchQuery from '../../utils/hooks/useSearchQuery';
import NotFound from '../../app/[locale]/not-found';
import { useCharStore } from '../../store/useStore';
import Flyout from '../Flyout/Flyout';
import { useTheme } from '../../utils/hooks/useTheme';
import { downloadCsv } from '../../utils/helpers/downloadCsv';
import { useCharacters } from '../../utils/hooks/useCharacters';
import { useTotalPages } from '../../utils/hooks/useTotalPages';
import { useQueryClient } from '@tanstack/react-query';
import Details from '../Details/Details';

const Page: FC = () => {
  const [throwError, setThrowError] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useSearchQuery('search_3iq6e');
  const selectedChars = useCharStore((state) => state.selectedChars);
  const detailId = searchParams.get('details');
  const page = Number(searchParams.get('page')) || 1;

  const { theme } = useTheme();

  const queryClient = useQueryClient();
  const {
    data: characters,
    isFetching,
    isLoading,
    isError,
    error,
  } = useCharacters(query, page);
  const { data: totalPages = 1 } = useTotalPages(query);

  const refetch = () => {
    const keys = [
      ['characters', query],
      ['character', detailId],
      ['totalPages', query],
    ];
    keys.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: key });
    });
  };

  const handleSearch = async (query: string) => {
    setQuery(query);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    const id = searchParams.get('details');
    if (id) {
      params.set('details', id);
    } else {
      router.push(`${pathname}?${params}`);
    }
  };

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', `${page}`);
    router.push(`${pathname}?${params}`);
  };

  const handleCloseDetails = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('details');
    router.push(`${pathname}?${params}`);
  };

  const hasInvalidParam = Array.from(searchParams.keys()).some(
    (param) => !['page', 'details'].includes(param)
  );

  if (throwError) {
    throw new Error('Test render error.');
  }

  if (hasInvalidParam) {
    return <NotFound />;
  }

  return (
    <div
      className={`${styles.page} ${styles[theme]}`}
      onClick={() => detailId && handleCloseDetails()}
    >
      <Search search={handleSearch} />
      {selectedChars.length ? (
        <Flyout download={() => downloadCsv(selectedChars)} />
      ) : null}
      <div
        className={styles['pagination-wrapper']}
        onClick={(event) => event.stopPropagation()}
      >
        {!isLoading && characters && (
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
            result={characters || []}
            loading={isLoading || isFetching}
            error={isError ? error?.message : null}
            page={page}
          />
        </div>
        {detailId && <Details />}
      </div>
      <div className={styles.hide}>
        <Button color="error" onClick={() => setThrowError(true)}>
          Throw Error
        </Button>
      </div>
      <Button
        color="error"
        onClick={(event) => {
          event.stopPropagation();
          refetch();
        }}
      >
        Refetch
      </Button>
    </div>
  );
};

export default Page;
