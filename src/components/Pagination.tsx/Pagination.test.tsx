import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Pagination', () => {
  it('render correct page number', () => {
    renderWithRouter(
      <Pagination page={1} pageChange={() => {}} totalPages={100} />
    );
    const page = screen.getByText('1');
    expect(page).toBeInTheDocument();
  });
});
