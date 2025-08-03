import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from './Details';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );

const renderWithMemory = (ui: React.ReactElement, entry: string) =>
  render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[entry]}>{ui}</MemoryRouter>
    </ThemeProvider>
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
});
