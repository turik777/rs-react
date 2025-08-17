import type { Character } from '../interface/interface';

export const API_URL = 'https://rickandmortyapi.com/api/character';

async function fetchCharacters(url: string): Promise<Character[]> {
  const res = await fetch(url, { cache: 'force-cache' });
  if (res.status === 404) {
    return [];
  }
  if (!res.ok) {
    throw new Error(`HTTP error! Failed to fetch data. Status: ${res.status}`);
  }
  const data = await res.json();
  return data.results;
}

export const searchCharacters = (
  query: string,
  page: number = 1
): Promise<Character[]> => {
  const url = `${API_URL}/?name=${query}&page=${page}`;
  return fetchCharacters(url);
};

export async function getTotalPages(query?: string): Promise<number> {
  const res = query
    ? await fetch(`${API_URL}/?name=${query}`, { cache: 'force-cache' })
    : await fetch(API_URL, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const data = await res.json();
  if (!data.info) {
    return 1;
  }
  return data.info.pages;
}

export const getCharacterById = async (id: string): Promise<Character> => {
  const res = await fetch(`${API_URL}/${id}`, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`Failed to fetch character with id ${id}`);
  }
  const data = await res.json();
  return data;
};
