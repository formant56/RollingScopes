import { useState } from 'react';
import { setRequest } from '../../utils/local-storage';
import { useRouter } from 'next/router';
import { PaginationProps } from '../../utils/types';

export default function Search({
  query,
  page,
  limit,
}: PaginationProps): JSX.Element {
  const [tempSearchKey, setTempSearchKey] = useState('');
  // localStorage.getItem('searchKeys') || ''
  const router = useRouter();

  const catchEnter = (key: string): void => {
    if (key === 'Enter') search();
  };

  const search = async (): Promise<void> => {
    const cleanQuery: string = tempSearchKey.trim();
    // const { page, limit } = router.query;
    setRequest(cleanQuery);
    const newUrl = `/query=${cleanQuery}-page=${page}-limit=${limit}`;
    router.push(newUrl);
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
      <h1 className="query">{query ? query.toUpperCase() : 'Trending'}</h1>
    </section>
  );
}
