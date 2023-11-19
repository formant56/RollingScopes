import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { mockResponse } from './helpers/mockRequest';
import {
  BrowserRouter,
  MemoryRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Gif from '../components/Gif';
import { IGif } from '../utils/types';
import { act } from 'react-dom/test-utils';
import App from '../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockResponseWithId } from './helpers/mockRequestWithId';
import DetailedItem from '../components/DetailedItem';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios
    .onGet('https://api.giphy.com/v1/gifs/trending')
    .reply(200, mockResponse);
  mockAxios.onAny().reply(200, mockResponseWithId);
});

describe('Tests for the Card component:', () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });
  test('Ensure that the card component renders the relevant card data.', async () => {
    const mockGif: IGif = mockResponse.data[0];
    render(
      <MemoryRouter>
        <Gif
          gif={mockGif}
          details={{ isDetails: false, setIsDetails: () => {} }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(mockGif.title)).toBeDefined();
  });

  test('Validate that clicking on a card opens a detailed card component.', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('detailed-item')).toBeNull();

    const renderedGifs = await screen.findAllByTestId('gif');
    await act(async () => {
      fireEvent.click(renderedGifs[0]);
    });

    expect(screen.queryByTestId('detailed-item')).toBeDefined();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    expect(mockAxios.history.get.length).toBe(0);
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page/" element={<App />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
    expect(mockAxios.history.get.length).toBe(1);
    const renderedGifs = await screen.findAllByTestId('gif');
    await act(async () => {
      fireEvent.click(renderedGifs[0]);
    });
    expect(mockAxios.history.get.length).toBe(2);
  });
});
