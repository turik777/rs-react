import type { Character } from './interface';

export const getAllCharacters = async (): Promise<Character[]> => {
  const res = await fetch('https://zelda.fanapis.com/api/characters?limit=30');
  if (!res.ok)
    throw new Error(`HTTP error! Failed to fetch data. Status: ${res.status}`);
  const data = await res.json();
  return data.data;
};

export async function searchCharacters(query: string) {
  const allCharacters = await getAllCharacters();
  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  return filteredCharacters;
}
