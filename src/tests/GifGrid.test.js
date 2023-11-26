import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GifLayout from '../pages/components/GifGrid';
import Gif from '../pages/components/Gif';

jest.mock('../pages/components/Gif');

describe('GifLayout Component', () => {
  const mockGifs = [
    {
      id: '1',
      title: 'Gif 1',
      images: {
        original: {
          mp4: 'mp4url1',
          url: 'urlstring1',
        },
        fixed_width_small_still: {
          url: 'smallurl1',
        },
      },
    },
    {
      id: '2',
      title: 'Gif 2',
      images: {
        original: {
          mp4: 'mp4url2',
          url: 'urlstring2',
        },
        fixed_width_small_still: {
          url: 'smallurl2',
        },
      },
    },
  ];

  test('renders Gif components for non-empty gifs array', () => {
    render(<GifLayout gifs={mockGifs} isDetails={false} />);
    mockGifs.forEach((gif) => {
      expect(Gif).toHaveBeenCalledWith(
        { gif, isDetails: false },
        expect.anything()
      );
    });
  });

  test('renders message for empty gifs array', () => {
    render(<GifLayout gifs={[]} isDetails={false} />);
    expect(
      screen.getByText('Sorry, there is nothing to show you :(')
    ).toBeInTheDocument();
  });

  test('class name changes based on isDetails', () => {
    const { rerender } = render(
      <GifLayout gifs={mockGifs} isDetails={false} />
    );
    expect(screen.getByTestId('gif-section')).toHaveClass('api-items');

    rerender(<GifLayout gifs={mockGifs} isDetails={true} />);
    expect(screen.getByTestId('gif-section')).toHaveClass('api-items half');
  });
});
