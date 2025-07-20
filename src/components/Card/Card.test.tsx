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

  it('apply alive class when status is Alive', () => {
    render(<Card {...mockCharacters[0]} status="Alive" />);
    const statusElement = screen.getByText(/alive/i);
    expect(statusElement.className).toMatch(/alive/);
  });

  it('apply dead class when status is Dead', () => {
    render(<Card {...mockCharacters[0]} status="Dead" />);
    const statusElement = screen.getByText(/dead/i);
    expect(statusElement.className).toMatch(/dead/);
  });

  it('apply unknown class when status is unknown', () => {
    render(<Card {...mockCharacters[0]} status="unknown" />);
    const statusElement = screen.getByText(/unknown/i);
    expect(statusElement.className).toMatch(/unknown/);
  });
});
