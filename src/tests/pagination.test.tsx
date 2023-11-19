import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DetailedItem from '../components/DetailedItem';
import App from '../App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { mockResponse } from './helpers/mockRequest';
import { mockResponseWithId } from './helpers/mockRequestWithId';
import { act } from 'react-dom/test-utils';

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

describe('Tests for the Pagination component:', () => {
  test('Make sure the component updates URL query parameter when page changes.', async () => {
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
    await screen.findAllByTestId('gif');

    expect(location.pathname).toBe('/page/1');

    const pages = screen.getAllByTestId('page-number');
    await act(async () => {
      fireEvent.click(pages[1]);
    });

    expect(location.pathname).toBe('/page/2');
  });
});
