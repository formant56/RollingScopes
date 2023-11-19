import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DetailedItem from '../components/DetailedItem';
import App from '../App';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { mockResponse } from './helpers/mockRequest';
import { mockResponseWithId } from './helpers/mockRequestWithId';
import { act } from 'react-dom/test-utils';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios
    .onGet('https://api.giphy.com/v1/gifs/trending')
    .reply(200, mockResponse);
  mockAxios.onGet(/.*JIX9t2j0ZTN9S.*/).reply(200, mockResponseWithId);
});

afterEach(() => {
  mockAxios.resetHistory();
});

describe('Tests for the Detailed Card component:', () => {
  test('Check that a loading indicator is displayed while fetching data.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/JIX9t2j0ZTN9S']}>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page/" element={<App />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('loading')).toBeDefined();
    expect(await screen.findByTestId('detailed-item')).toBeDefined();
  });

  test('Make sure the detailed card component correctly displays the detailed card data.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/JIX9t2j0ZTN9S']}>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page/" element={<App />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    await screen.findByTestId('detailed-item');
    const details = screen.getByTestId('detailed-item');
    expect(details.getElementsByTagName('h2')[0].textContent).toBe(
      mockResponseWithId.data.title
    );
  });

  test('Ensure that clicking the close button hides the component.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/JIX9t2j0ZTN9S']}>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page/" element={<App />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('detailed-item')).toBeDefined();
    expect(screen.queryByTestId('detailed-item')).not.toBeNull();
    const closeButton = await screen.findByTestId('close');
    await act(async () => {
      fireEvent.click(closeButton);
    });
    expect(screen.queryByTestId('detailed-item')).toBeNull();
  });

  test('Request to undefined gif returns an error.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/asd']}>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page/" element={<App />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Request failed with status code 404')
    ).toBeDefined();
    expect(screen.queryByText('Empty fake request')).toBeNull();
  });
});
