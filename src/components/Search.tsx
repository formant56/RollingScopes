import { useState } from 'react';
import { setRequest } from '../utils/local-storage';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeyValue, selectSearchkey } from './searchSlice';

export default function Search(): JSX.Element {
  const dispatch = useDispatch();
  const searchKey = useSelector(selectSearchkey);
  const [tempSearchKey, setTempSearchKey] = useState(searchKey || '');

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = tempSearchKey.trim();
    setRequest(cleanQuery);
    dispatch(setSearchKeyValue(cleanQuery));
  };

  const typing = (text: string): void => {
    setTempSearchKey(text);
  };

  return (
    <section className="search">
      <input
        className="input-search"
        type="text"
        onChange={(event) => typing(event.target.value)}
        onKeyDown={(event) => catchEnter(event.key)}
        value={tempSearchKey}
        data-testid="search-input"
      />
      <button
        className="send-button"
        onClick={search}
        data-testid="search-button"
      >
        Search
      </button>
      <h1 className="query">
        {searchKey ? searchKey.toUpperCase() : 'Trending'}
      </h1>
    </section>
  );
}
