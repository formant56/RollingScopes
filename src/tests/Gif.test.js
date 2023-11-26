import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Gif from '../pages/components/Gif'; // Adjust the import path as needed
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Gif Component', () => {
  const mockGifData = {
    title: 'Test Gif',
    images: {
      fixed_width_small_still: {
        url: 'http://example.com/still.jpg',
      },
      original: {
        mp4: 'http://example.com/gif.mp4',
      },
    },
    id: '123',
  };
  const mockRouter = {
    asPath: '/current-path',
    push: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  test('renders with isDetails as true', () => {
    render(<Gif gif={mockGifData} isDetails={true} />);
    expect(screen.getByText('Test Gif')).toBeInTheDocument();
    expect(screen.getByTestId('item-content')).toHaveAttribute(
      'src',
      'http://example.com/gif.mp4'
    );
    expect(screen.queryByTestId('gif')).toBeNull();
  });

  test('renders with isDetails as false', () => {
    render(<Gif gif={mockGifData} isDetails={false} />);
    expect(screen.getByText('Test Gif')).toBeInTheDocument();
    expect(screen.getByTestId('item-content')).toHaveAttribute(
      'src',
      'http://example.com/gif.mp4'
    );
    const link = screen.getByTestId('gif');
    expect(link).toHaveAttribute('href', '/current-path/123');
  });

  test('link click behavior', () => {
    render(<Gif gif={mockGifData} isDetails={false} />);
    const link = screen.getByTestId('gif');
    fireEvent.click(link);
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
