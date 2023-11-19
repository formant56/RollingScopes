import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Context } from '../utils/contexts';
import { mockResponse } from './helpers/mockRequest';
import Gifs from '../components/Gifs';
import { MemoryRouter } from 'react-router-dom';

describe('Tests for the Card List component:', () => {
  test('Verify that the component renders the specified number of cards.', async () => {
    render(
      <MemoryRouter>
        <Context.Provider value={{ gifs: mockResponse.data }}>
          <Gifs
            isLoading={false}
            details={{ isDetails: false, setIsDetails: () => {} }}
          />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(screen.getAllByTestId('gif')).toHaveLength(2);
  });

  test('Check that an appropriate message is displayed if no cards are present.', async () => {
    render(
      <MemoryRouter>
        <Context.Provider value={{ gifs: [] }}>
          <Gifs
            isLoading={false}
            details={{ isDetails: false, setIsDetails: () => {} }}
          />
        </Context.Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByText('Sorry, there is nothing to show you :(')
    ).toBeDefined();
  });
});
