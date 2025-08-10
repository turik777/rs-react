import { useQuery } from '@tanstack/react-query';
import { getTotalPages } from '../api';

export const useTotalPages = (query: string) => {
  return useQuery<number, Error>({
    queryKey: ['totalPages', query],
    queryFn: () => getTotalPages(query),
  });
};
