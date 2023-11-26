import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Search from '../pages/components/Search/Search';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Search Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
  });

  test('renders search component', () => {
    const { getByTestId } = render(<Search />);
    expect(getByTestId('search-input')).toBeInTheDocument();
    expect(getByTestId('search-button')).toBeInTheDocument();
  });

  test('allows typing in search input', () => {
    const { getByTestId } = render(<Search />);
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input.value).toBe('test query');
  });

  test('clicking search button triggers navigation', async () => {
    const { getByTestId } = render(<Search />);
    const input = getByTestId('search-input');
    const button = getByTestId('search-button');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test query' } });
      fireEvent.click(button);
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/query=test query-page=undefined-limit=undefined'
    );
  });

  test('pressing Enter in input triggers navigation', async () => {
    const { getByTestId } = render(<Search />);
    const input = getByTestId('search-input');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'test query' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/query=test query-page=undefined-limit=undefined'
    );
  });
});
