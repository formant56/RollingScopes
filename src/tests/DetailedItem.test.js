import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailedItem from '../pages/components/DetailedItem'; // Adjust the import path as needed
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockBack = jest.fn();
useRouter.mockReturnValue({ back: mockBack });

describe('DetailedItem Component', () => {
  const mockGifData = {
    data: {
      data: {
        title: 'Test Gif',
        id: 'testid',
        images: {
          fixed_width_small_still: {
            url: 'http://example.com/still.jpg',
          },
          original: {
            mp4: 'http://example.com/gif.mp4',
          },
        },
        user: {
          display_name: 'Test User',
          description: 'Test Description',
        },
      },
    },
  };

  test('renders detailed item for valid gif data', () => {
    render(<DetailedItem oneGif={mockGifData} />);
    expect(screen.getByTestId('detailed-item')).toBeInTheDocument();
    expect(screen.getByText('Test Gif')).toBeInTheDocument();
    expect(screen.getByText('Author: Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('clicking close button triggers navigation back', () => {
    render(<DetailedItem oneGif={mockGifData} />);
    fireEvent.click(screen.getByTestId('close'));
    expect(mockBack).toHaveBeenCalled();
  });

  test('clicking outside modal overlay triggers navigation back', () => {
    render(<DetailedItem oneGif={mockGifData} />);
    fireEvent.click(document);
    expect(mockBack).toHaveBeenCalled();
  });

  test('renders "Nothing to see" for invalid gif data', () => {
    render(<DetailedItem oneGif={{ data: null }} />);
    expect(screen.getByText('Nothing to see')).toBeInTheDocument();
  });
});
