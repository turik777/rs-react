import { useQuery } from '@tanstack/react-query';
import type { Character } from '../../interface/interface';
import { getCharacterById } from '../api';

export const useCharacterById = (id: string) => {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });
};
