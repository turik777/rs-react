import { useQuery } from '@tanstack/react-query';
import type { Character } from '../../interface/interface';
import { searchCharacters } from '../api';

export const useCharacters = (query: string, page: number) => {
  return useQuery<Character[], Error>({
    queryKey: ['characters', query, page],
    queryFn: () => searchCharacters(query, page),
  });
};
