import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Result from './Result';
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
];

describe('Result Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Result loading={true} result={[]} error={null} />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(<Result loading={false} result={[]} error={'Test error'} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<Result loading={false} result={[]} error={null} />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders CardList', () => {
    render(<Result loading={false} result={mockCharacters} error={null} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
