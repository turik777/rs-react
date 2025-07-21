import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardList from './CardList';
import { mockCharacters } from '../../utils/__mocks__/handlers';

afterEach(() => cleanup());

describe('CardList', () => {
  it('renders without crashing', () => {
    render(<CardList result={mockCharacters} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('displays correct number of cards', () => {
    render(<CardList result={mockCharacters} />);
    const cards: [] = [];
    mockCharacters.forEach((character) => {
      cards.push(screen.getByText(character.name));
    });
    expect(cards).toHaveLength(mockCharacters.length);
  });
});
