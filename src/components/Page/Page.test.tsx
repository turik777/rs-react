import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import * as api from '../../utils/api';
import Page from './Page';
import { mockCharacters } from '../../utils/__mocks__/handlers';

beforeEach(() => {
  vi.spyOn(api, 'getAllCharacters').mockResolvedValue(mockCharacters);
  vi.spyOn(api, 'searchCharacters').mockResolvedValue(mockCharacters);
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Page', () => {
  it('search characters from localStorage', async () => {
    localStorage.setItem('search_3iq6e', 'Rick');
    render(<Page />);
    await waitFor(() => {
      expect(api.searchCharacters).toHaveBeenCalledWith('Rick');
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('show error message on API failure', async () => {
    vi.spyOn(api, 'getAllCharacters').mockRejectedValue(
      new Error('Test error')
    );
    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    });
  });

  it('show error message if error is not instance of Error', async () => {
    vi.spyOn(api, 'getAllCharacters').mockRejectedValue('error');
    render(<Page />);
    await waitFor(() => {
      expect(
        screen.getByText('An unexpected error occurred.')
      ).toBeInTheDocument();
    });
  });

  it('throw error when throw button is clicked', () => {
    render(<Page />);
    const throwButton = screen.getByRole('button', { name: /Throw Error/i });
    expect(() => {
      fireEvent.click(throwButton);
    }).toThrow('Test render error.');
  });
});
