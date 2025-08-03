import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Button from './Button';
import { ThemeProvider } from '../../context/ThemeProvider';

describe('Button', () => {
  it('renders text inside the button', () => {
    const { getByRole } = render(
      <ThemeProvider>
        <Button color="primary" onClick={() => {}}>
          Click!
        </Button>
      </ThemeProvider>
    );
    expect(getByRole('button')).toHaveTextContent('Click!');
  });
});
