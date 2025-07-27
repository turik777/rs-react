import { render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Search from './Search';
import { BrowserRouter } from 'react-router';

afterEach(() => {
  localStorage.clear();
});

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Search', () => {
  it('call search function and set localStorage on button click', () => {
    renderWithRouter(<Search search={() => ''} />);
    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(buttons[0]);
    expect(localStorage.getItem('search_3iq6e')).toBe('Rick');
  });
});
