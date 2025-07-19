import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Loader from './Loader';

describe('Loader', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });
});
