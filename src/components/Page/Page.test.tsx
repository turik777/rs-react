import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as api from '../../utils/api';
import Page from './Page';
import { mockCharacters } from '../../utils/__mocks__/handlers';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';

beforeEach(() => {
  vi.spyOn(api, 'getAllCharacters').mockResolvedValue(mockCharacters);
  vi.spyOn(api, 'searchCharacters').mockResolvedValue(mockCharacters);
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );

describe('Page', () => {
  it('search characters from localStorage', async () => {
    localStorage.setItem('search_3iq6e', 'Rick');
    renderWithRouter(<Page />);
    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalledWith('Rick', 1);
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('show error message on API failure', async () => {
    vi.spyOn(api, 'getAllCharacters').mockRejectedValue(
      new Error('Test error')
    );
    renderWithRouter(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    });
  });

  it('show error message if error is not instance of Error', async () => {
    vi.spyOn(api, 'getAllCharacters').mockRejectedValue('error');
    renderWithRouter(<Page />);
    await waitFor(() => {
      expect(
        screen.getByText('An unexpected error occurred.')
      ).toBeInTheDocument();
    });
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
});
