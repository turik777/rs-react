import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Flyout from './Flyout';
import { ThemeProvider } from '../../context/ThemeProvider';
import Result from '../Result/Result';
import { mockCharacters } from '../../utils/__mocks__/handlers';
import { BrowserRouter } from 'react-router';

const mockDownload = vi.fn();

describe('Flyout', () => {
  it('render correctly with selected items', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <Result
            loading={false}
            result={mockCharacters}
            error={null}
            page={1}
          />
          <Flyout download={mockDownload} />
        </BrowserRouter>
      </ThemeProvider>
    );
    const checkboxes = screen.getAllByText('Add to favorite');
    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });
    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
