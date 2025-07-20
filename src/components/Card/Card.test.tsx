import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Card from './Card';
import styles from './card.module.scss';
import { mockCharacters } from '../../utils/__mocks__/handlers';

afterEach(() => cleanup());

describe('Card', () => {
  it('renders the character image with correct src', () => {
    render(<Card {...mockCharacters[0]} />);
    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', mockCharacters[0].image);
  });

  it('should apply correct style', () => {
    render(<Card {...mockCharacters[0]} />);
    const statusElement = screen.getByText('ALIVE');
    expect(statusElement).toHaveClass(styles.alive);
    expect(statusElement).not.toHaveClass(styles.dead);
    expect(statusElement).not.toHaveClass(styles.unknown);
  });
});
