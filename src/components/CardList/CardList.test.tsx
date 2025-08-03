import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardList from './CardList';
import { mockCharacters } from '../../utils/__mocks__/handlers';
import { BrowserRouter, MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../context/ThemeProvider';

afterEach(() => cleanup());

const renderWithRouter = (ui: React.ReactElement) =>
  render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedNavigate = vi.fn();

describe('CardList', () => {
  it('renders without crashing', () => {
    renderWithRouter(<CardList result={mockCharacters} page={1} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('displays correct number of cards', () => {
    renderWithRouter(<CardList result={mockCharacters} page={1} />);
    const cards: [] = [];
    mockCharacters.forEach((character) => {
      cards.push(screen.getByText(character.name));
    });
    expect(cards).toHaveLength(mockCharacters.length);
  });

  it('call navigate with correct search params when card is clicked', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/?page=2']}>
          <CardList result={mockCharacters} page={2} />
        </MemoryRouter>
      </ThemeProvider>
    );
    const card = screen.getByText('Rick Sanchez');
    fireEvent.click(card);
    expect(mockedNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: expect.stringContaining('page=2'),
    });
    expect(mockedNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: expect.stringContaining('details=1'),
    });
  });
});
