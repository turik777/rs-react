import { describe, it, expect, afterEach } from 'vitest';
import { getAllCharacters, searchCharacters } from '../api';
import { http } from 'msw';
import { cleanup } from '@testing-library/react';
import { server } from '../__mocks__/node';
import { mockCharacters } from '../__mocks__/handlers';
import { filterByName } from '../helpers/filterByName';

afterEach(() => cleanup());

describe('API functions', () => {
  it('fetches all characters', async () => {
    const characters = await getAllCharacters();
    expect(characters).toEqual(mockCharacters);
  });

  it('should search characters by name', async () => {
    const characters = await searchCharacters('Rick');
    expect(characters).toEqual(filterByName('Rick'));
  });

  it('throws error when fetch fails', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return new Response(null, { status: 500 });
      })
    );
    await expect(getAllCharacters()).rejects.toThrow(/HTTP error!/);
  });
});
