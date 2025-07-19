import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Button from './Button';

describe('Button', () => {
  it('renders text inside the button', () => {
    const { getByRole } = render(
      <Button color="primary" onClick={() => {}}>
        Click!
      </Button>
    );
    expect(getByRole('button')).toHaveTextContent('Click!');
  });
});
