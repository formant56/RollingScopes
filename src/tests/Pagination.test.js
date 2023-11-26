import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../pages/components/Pagination/Pagination';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
useRouter.mockReturnValue({ push: mockPush });

describe('Pagination Component', () => {
  const mockData = {
    data: {
      pages: {
        numbers: [1, 2, 3, 4, 5],
        last: 5,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination component', () => {
    render(
      <Pagination query="test" page={1} limit={10} responseData={mockData} />
    );
    const pageNumberElements = screen.getAllByTestId('page-number');
    expect(pageNumberElements.length).toBe(mockData.data.pages.numbers.length);
  });

  test('displays correct page numbers', () => {
    render(
      <Pagination query="test" page={1} limit={10} responseData={mockData} />
    );
    const pageNumberElements = screen.getAllByTestId('page-number');

    mockData.data.pages.numbers.forEach((number) => {
      const pageNumberElement = pageNumberElements.find(
        (element) => element.textContent === number.toString()
      );
      expect(pageNumberElement).toBeInTheDocument();
    });
  });

  test('has correct href attributes in links', () => {
    render(
      <Pagination query="test" page={1} limit={10} responseData={mockData} />
    );
    const pageNumberElements = screen.getAllByTestId('page-number');

    mockData.data.pages.numbers.forEach((number) => {
      const linkElement = pageNumberElements.find(
        (element) => element.textContent === number.toString()
      );
      expect(linkElement).toHaveAttribute(
        'href',
        `/query=test-page=${number}-limit=10`
      );
    });
  });

  test('changes limit and triggers navigation on range input change', () => {
    render(
      <Pagination query="test" page={1} limit={10} responseData={mockData} />
    );
    const rangeInput = screen.getByRole('slider');
    fireEvent.change(rangeInput, { target: { value: 20 } });
    fireEvent.mouseUp(rangeInput);
    expect(mockPush).toHaveBeenCalledWith('/query=test-page=1-limit=20');
  });

  test('renders with default props', () => {
    render(<Pagination />);
    const activePageLink = screen.getByText('10');
    expect(activePageLink).toBeInTheDocument();
  });
});
