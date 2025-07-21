import { mockCharacters } from '../__mocks__/handlers';

export function filterByName(name: string) {
  return mockCharacters.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase())
  );
}
