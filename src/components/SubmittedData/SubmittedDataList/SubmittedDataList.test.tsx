import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SubmittedDataList from './SubmittedDataList';
import '@testing-library/jest-dom/vitest';

vi.useFakeTimers();

const mockData = [
  {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    password: 'Password123!',
    passwordConfirm: 'Password123!',
    gender: 'male' as const,
    country: 'USA',
    picture: 'https://example.com/test.jpg',
    acceptTerms: true,
  },
  {
    name: 'Jane Doe',
    age: 25,
    email: 'jane.smith@example.com',
    password: 'Password123!',
    passwordConfirm: 'Password123!',
    gender: 'female' as const,
    country: 'Canada',
    picture: null,
    acceptTerms: true,
  },
];

describe('SubmittedDataCard', () => {
  it('render title', () => {
    render(
      <SubmittedDataList title="My Title" data={[]} lastSubmittedId={null} />
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('render no data message', () => {
    render(
      <SubmittedDataList title="Empty" data={[]} lastSubmittedId={null} />
    );
    expect(screen.getByText('No data submitted yet.')).toBeInTheDocument();
  });

  it('render data list', () => {
    render(
      <SubmittedDataList title="List" data={mockData} lastSubmittedId={null} />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('highlight last submitted id and remove after timeout', () => {
    render(
      <SubmittedDataList title="List" data={mockData} lastSubmittedId={2} />
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    vi.advanceTimersByTime(3000);
  });
});
