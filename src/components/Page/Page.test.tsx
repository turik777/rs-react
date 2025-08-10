import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  renderHook,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as api from '../../utils/api';
import Page from './Page';
import { mockCharacters } from '../../utils/__mocks__/handlers';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCharacters } from '../../utils/hooks/useCharacters';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderWithRouter = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
  return queryClient;
};

const clientWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Page', () => {
  it('search characters from localStorage', async () => {
    localStorage.setItem('search_3iq6e', 'Rick');
    const searchSpy = vi
      .spyOn(api, 'searchCharacters')
      .mockResolvedValue([mockCharacters[0]]);
    const { result } = renderHook(
      () => useCharacters(localStorage.getItem('search_3iq6e') || '', 1),
      {
        wrapper: clientWrapper,
      }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(searchSpy).toHaveBeenCalledWith('Rick', 1);
    expect(result.current.data?.[0].name).toBe('Rick Sanchez');
  });

  it('throw error when throw button is clicked', () => {
    renderWithRouter(<Page />);
    const throwButton = screen.getByRole('button', { name: /Throw Error/i });
    expect(() => {
      fireEvent.click(throwButton);
    }).toThrow('Test render error.');
  });

  it('sets "page=1" in URL', async () => {
    renderWithRouter(<Page />);

    const searchButton = screen.getByText('Search');
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(window.location.search).toContain('page=1');
  });

  it('call invalidateQueries with expected keys when refetch button clicked', () => {
    const queryClient = renderWithRouter(<Page />);
    const spy = vi.spyOn(queryClient, 'invalidateQueries');
    const refetchButton = screen.getByRole('button', { name: /refetch/i });
    fireEvent.click(refetchButton);
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({ queryKey: ['characters', ''] });
    expect(spy).toHaveBeenCalledWith({ queryKey: ['character', null] });
    expect(spy).toHaveBeenCalledWith({ queryKey: ['totalPages', ''] });
  });
});
