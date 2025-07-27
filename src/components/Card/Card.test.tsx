import { describe, it, expect, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Card from './Card';
import styles from './card.module.scss';
import { mockCharacters } from '../../utils/__mocks__/handlers';

afterEach(() => cleanup());

describe('Card', () => {
  const [character] = mockCharacters;

  it('renders the character image with correct src', () => {
    render(<Card {...character} />);
    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('src', character.image);
  });

  it('should apply correct style', () => {
    render(<Card {...character} />);
    const statusElement = screen.getByText('ALIVE');
    expect(statusElement).toHaveClass(styles.alive);
    expect(statusElement).not.toHaveClass(styles.dead);
    expect(statusElement).not.toHaveClass(styles.unknown);
  });

  it('apply alive class when status is Alive', () => {
    render(<Card {...character} status="Alive" />);
    const statusElement = screen.getByText(/alive/i);
    expect(statusElement.className).toMatch(/alive/);
  });

  it('apply dead class when status is Dead', () => {
    render(<Card {...character} status="Dead" />);
    const statusElement = screen.getByText(/dead/i);
    expect(statusElement.className).toMatch(/dead/);
  });

  it('apply unknown class when status is unknown', () => {
    render(<Card {...character} status="unknown" />);
    const statusElement = screen.getByText(/unknown/i);
    expect(statusElement.className).toMatch(/unknown/);
  });
});
