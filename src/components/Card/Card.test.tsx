import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Card from './Card';
import type { Character } from '../../interface/interface';
import styles from './card.module.scss';

const mockCharacter: Character = {
  id: '1',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  status: 'Alive',
};

afterEach(() => cleanup());

describe('Card', () => {
  it('renders the character image with correct src', () => {
    render(<Card {...mockCharacter} />);
    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', mockCharacter.image);
  });

  it('should apply correct style', () => {
    render(<Card {...mockCharacter} />);
    const statusElement = screen.getByText('ALIVE');
    expect(statusElement).toHaveClass(styles.alive);
    expect(statusElement).not.toHaveClass(styles.dead);
    expect(statusElement).not.toHaveClass(styles.unknown);
  });
});
