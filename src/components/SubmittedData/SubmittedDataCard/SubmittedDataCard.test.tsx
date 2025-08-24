import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmittedDataCard from './SubmittedDataCard';
import '@testing-library/jest-dom/vitest';

const mockData = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  password: 'Password123!',
  passwordConfirm: 'Password123!',
  gender: 'male' as const,
  country: 'USA',
  picture: 'https://example.com/profile.jpg',
  acceptTerms: true,
};

const mockDataWithoutPicture = {
  name: 'Jane Doe',
  age: 25,
  email: 'jane.smith@example.com',
  password: 'Password123!',
  passwordConfirm: 'Password123!',
  gender: 'female' as const,
  country: 'Canada',
  picture: null,
  acceptTerms: true,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SubmittedDataCard', () => {
  it('should render the data card with all fields when data is provided', () => {
    render(<SubmittedDataCard data={mockData} />);
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render the card without an image if no picture is provided', () => {
    render(<SubmittedDataCard data={mockDataWithoutPicture} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should render the "No data" message when data is null', () => {
    render(<SubmittedDataCard data={null} />);
    expect(screen.getByText('No data submitted yet.')).toBeInTheDocument();
    expect(screen.queryByText('Name:')).not.toBeInTheDocument();
  });
});
