import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { mockResponse } from './helpers/mockRequest';
import { mockResponseWithId } from './helpers/mockRequestWithId';
import DetailedItem from '../components/DetailedItem';
import NotFound from '../components/not-found/NotFound';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios
    .onGet('https://api.giphy.com/v1/gifs/trending')
    .reply(200, mockResponse);
  mockAxios.onAny().reply(200, mockResponseWithId);
});

afterEach(() => {
  mockAxios.resetHistory();
});

describe('Tests for the 404 Page component:', () => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route.', async () => {
    const badRequest: string = '/bla-bla-bla';

    render(
      <MemoryRouter initialEntries={[badRequest]}>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" />} />
          <Route path="/page/:page/" element={<App />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
          <Route path="*" element={<NotFound />}>
            <Route path="details/:id" element={<DetailedItem />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const error: HTMLElement = await screen.findByTestId('message');
    expect(error.textContent).toBe('That page cannot be found.');
  });
});
