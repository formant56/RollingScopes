import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import { SearchContext } from '../utils/searchcontexts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ page: '1' }),
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest
    .fn()
    .mockReturnValue({ searchValue: 'Test', setSearchValue: jest.fn() }),
}));

describe('Search Component', () => {
  test('clicking the Search button saves the entered value to local storage', async () => {
    const { getByText, getByRole } = render(<Search sendQuery={() => {}} />);

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      const storedValue = localStorage.getItem('searchKeys');
      expect(storedValue).toBe('test value');
    });
  });

  test('pressing the Enter key triggers the search', () => {
    const mockSendQuery = jest.fn();

    const { getByRole } = render(<Search sendQuery={mockSendQuery} />);

    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test query' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockSendQuery).toHaveBeenCalledWith(
      'test query',
      expect.any(Number)
    );
  });

  test('Search component retrieves the value from local storage upon mounting', () => {
    const testValue = 'test value from storage';
    localStorage.setItem('searchKeys', testValue);

    const { getByRole } = render(<Search sendQuery={() => {}} />);

    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(testValue);
  });
});

describe('Search Component', () => {
  test('setSearchValue is called with the correct value when a search is performed', () => {
    const setSearchValue = jest.fn();

    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      searchValue: '',
      setSearchValue,
    }));

    const { getByRole, getByText } = render(
      <SearchContext.Provider value={{ searchValue: '', setSearchValue }}>
        <Search sendQuery={() => {}} />
      </SearchContext.Provider>
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test query' } });

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    expect(setSearchValue).toHaveBeenCalledWith('test query');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
