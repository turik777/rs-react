import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Result from './Result';
import { mockCharacters } from '../../utils/__mocks__/handlers';
import { BrowserRouter } from 'react-router';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Result Component', () => {
  it('renders without crashing', () => {
    const { container } = renderWithRouter(
      <Result loading={true} result={[]} error={null} page={1} />
    );
    expect(container).toBeInTheDocument();
  });

  it('renders error state', () => {
    renderWithRouter(
      <Result loading={false} result={[]} error={'Test error'} page={1} />
    );
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    renderWithRouter(
      <Result loading={false} result={[]} error={null} page={1} />
    );
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders CardList', () => {
    renderWithRouter(
      <Result loading={false} result={mockCharacters} error={null} page={1} />
    );
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
