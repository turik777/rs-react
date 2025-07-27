import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  API_URL,
  getAllCharacters,
  getCharacterById,
  getTotalPages,
  searchCharacters,
} from '../api';
import { http } from 'msw';
import { cleanup } from '@testing-library/react';
import { server } from '../__mocks__/node';
import { mockCharacters } from '../__mocks__/handlers';
import { filterByName } from '../helpers/filterByName';

afterEach(() => cleanup());

function mockFetchResponse(data: unknown) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

describe('API functions', () => {
  it('fetches all characters', async () => {
    const characters = await getAllCharacters();
    expect(characters).toEqual(mockCharacters);
  });

  it('should search characters by name', async () => {
    const characters = await searchCharacters('Rick');
    expect(characters).toEqual(filterByName('Rick'));
  });

  it('throws error when 404', async () => {
    server.use(
      http.get(API_URL, () => {
        return new Response(null, { status: 404 });
      })
    );
    expect(getAllCharacters());
  });

  it('throws error when character fetch fails', async () => {
    server.use(
      http.get(API_URL, () => {
        return new Response(null, { status: 500 });
      })
    );
    await expect(getAllCharacters()).rejects.toThrow(/HTTP error!/);
  });

  it('throws error when total pages fetch fails', async () => {
    server.use(
      http.get(API_URL, () => {
        return new Response(null, { status: 500 });
      })
    );
    await expect(getTotalPages()).rejects.toThrow('HTTP error! Status: 500');
  });

  it('throws error when character id fetch fails', async () => {
    server.use(
      http.get(`${API_URL}/:id`, () => {
        return new Response(null, { status: 404 });
      })
    );
    await expect(getCharacterById('1')).rejects.toThrow(
      'Failed to fetch character with id 1'
    );
  });

  it('should return total pages from API', async () => {
    const mockPages = 100;
    const mockResponse = {
      info: { pages: mockPages },
    };
    mockFetchResponse(mockResponse);
    const pages = await getTotalPages();
    expect(pages).toBe(mockPages);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it('should return character by ID', async () => {
    mockFetchResponse(mockCharacters[0]);
    const data = await getCharacterById('1');
    expect(data).toEqual(mockCharacters[0]);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/1`);
  });
});
