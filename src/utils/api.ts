import type { Character } from './interface';

export const getAllCharacters = async (): Promise<Character[]> => {
  try {
    const res = await fetch(
      'https://zelda.fanapis.com/api/characters?limit=100'
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch characters:', error);
    return [];
  }
};

export async function searchCharacters(query: string) {
  const allCharacters = await getAllCharacters();
  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  return filteredCharacters;
}
