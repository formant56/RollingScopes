import React from 'react';
import { SearchContextProps } from './types';

export const SearchContext = React.createContext<SearchContextProps>({
  searchValue: '',
  setSearchValue: () => {},
});
