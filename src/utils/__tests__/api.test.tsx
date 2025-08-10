import { describe, it, expect, afterEach, vi } from 'vitest';
import { API_URL } from '../api';
import { http } from 'msw';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { server } from '../__mocks__/node';
import { mockCharacters } from '../__mocks__/handlers';
import { filterByName } from '../helpers/filterByName';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters } from '../hooks/useCharacters';
import { useTotalPages } from '../hooks/useTotalPages';
import { useCharacterById } from '../hooks/useCharacterById';

afterEach(() => cleanup());

const clientWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

function mockFetchResponse(data: unknown) {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

describe('API functions', () => {
  it('should search characters by name', async () => {
    const { result } = renderHook(() => useCharacters('Rick', 1), {
      wrapper: clientWrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(filterByName('Rick'));
  });

  it('throws error when total pages fetch fails', async () => {
    server.use(
      http.get(API_URL, () => {
        return new Response(null, { status: 500 });
      })
    );
    const { result } = renderHook(() => useTotalPages(''), {
      wrapper: clientWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(
        new Error('HTTP error! Status: 500')
      );
    });
    expect(result.current.data).toBeUndefined();
  });

  it('throws error when fails to fetch characters', async () => {
    server.use(
      http.get(`${API_URL}/?page=1`, () => {
        return new Response(null, { status: 500 });
      })
    );
    const { result } = renderHook(() => useCharacters('', 1), {
      wrapper: clientWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(
        new Error('HTTP error! Failed to fetch data. Status: 500')
      );
    });
    expect(result.current.data).toBeUndefined();
  });

  it('throws error when character id fetch fails', async () => {
    server.use(
      http.get(`${API_URL}/:id`, () => {
        return new Response(null, { status: 404 });
      })
    );
    const { result } = renderHook(() => useCharacterById('1'), {
      wrapper: clientWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toEqual(
      new Error('Failed to fetch character with id 1')
    );
  });

  it('should return total pages from API', async () => {
    const mockPages = 100;
    const mockResponse = {
      info: { pages: mockPages },
    };
    mockFetchResponse(mockResponse);
    const { result } = renderHook(() => useTotalPages(''), {
      wrapper: clientWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBe(mockPages);
  });

  it('should return character by ID', async () => {
    const [character] = mockCharacters;
    mockFetchResponse(character);
    const { result } = renderHook(() => useCharacterById('1'), {
      wrapper: clientWrapper,
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(character);
    });
    expect(result.current.data?.id).toBe(character.id);
  });
});
