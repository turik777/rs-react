import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CardList from './CardList';
import type { Character } from '../../interface/interface';

const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
  },
  {
    id: '3',
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    species: 'Human',
    gender: 'Female',
    status: 'Alive',
  },
];

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
