import type { Character } from './interface';

const API_URL = 'https://rickandmortyapi.com/api/character';

async function fetchCharacters(url: string): Promise<Character[]> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! Failed to fetch data. Status: ${res.status}`);
  }
  const data = await res.json();
  return data.results;
}

export const getAllCharacters = (
  url: string = API_URL
): Promise<Character[]> => {
  return fetchCharacters(url);
};

export const searchCharacters = (query: string): Promise<Character[]> => {
  const url = `${API_URL}/?name=${query}`;
  return fetchCharacters(url);
};
