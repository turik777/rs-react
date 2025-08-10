import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from './Details';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

const renderWithMemory = (ui: React.ReactElement, entry: string) =>
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[entry]}>{ui}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

describe('Details Component', () => {
  it('should not render when no id is present', () => {
    const { container } = renderWithRouter(<Details />);
    expect(container).toBeEmptyDOMElement();
  });

  it('load and display character by id from url search param', async () => {
    renderWithMemory(
      <Routes>
        <Route path="/" element={<Details />} />
      </Routes>,
      '/?details=1'
    );
    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Species:')).toBeInTheDocument();
      expect(screen.getByText('Gender:')).toBeInTheDocument();
      expect(screen.getByText('Status:')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  it('should display an error message when character fetch fails', async () => {
    renderWithMemory(
      <Routes>
        <Route path="/" element={<Details />} />
      </Routes>,
      '/?details=test'
    );
    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to fetch character with id test')
      ).toBeInTheDocument();
    });
  });
});
