import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Search from './Search';

afterEach(() => {
  localStorage.clear();
});

describe('Search', () => {
  it('call search function and set localStorage on button click', () => {
    render(<Search search={() => ''} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(button);
    expect(localStorage.getItem('search_3iq6e')).toBe('Rick');
  });
});
