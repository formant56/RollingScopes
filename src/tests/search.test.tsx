import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { mockResponse } from './helpers/mockRequest';
import { mockResponseWithId } from './helpers/mockRequestWithId';
import Search from '../components/Search';
import userEvent from '@testing-library/user-event';

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

describe('Tests for the Search component:', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage.', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input: HTMLElement = screen.getByTestId('search-input');
    const submit: HTMLElement = screen.getByTestId('search-button');
    const query: string = 'bla-bla-bla';

    await userEvent.type(input, query);
    await userEvent.click(submit);

    expect(localStorage.getItem('searchKeys')).toBe(query);
  });

  test('Check that the component retrieves the value from the local storage upon mounting.', async () => {
    const query: string = 'bla-bla-bla';
    localStorage.setItem('searchKeys', JSON.stringify(query));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input: HTMLInputElement = screen.getByTestId('search-input');
    expect(input.value.replace(/"/g, '')).toBe(query);
  });
});
