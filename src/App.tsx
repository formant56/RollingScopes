import { useState } from 'react';
import Search from './components/Search';
import { BackData, Gif, Pages } from './utils/types';
import ErrorBoundaryButton from './components/ErrorBoundaryButton';
import ErrorBoundary from './components/ErrorBoundary';
import APIError from './components/APIError';
import APIItems from './components/APIItems';
import getAll from './utils/API';
import { isError, isData } from './utils/type-guards';
import Pagination from './components/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { LimitContext, DataContext } from './utils/contexts';
import { SearchContext } from './utils/searchcontexts';

export default function App(): JSX.Element {
  const [dataState, setDataState] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(
    Number(useParams().page)
  );
  const [searchValue, setSearchValue] = useState<string>(
    localStorage.getItem('searchKeys') || ''
  );
  const [limit, setLimit] = useState<number>(10);
  const [pages, setPages] = useState<Pages>({ numbers: [], last: 0 });
  const [isDetails, setIsDetails] = useState<boolean>(false);
  const navigator = useNavigate();
  const params = useParams();

  function showError(error?: Error): void {
    if (error) {
      console.error(error.message);
      setErrorMsg(error.message);
    } else {
      setErrorMsg('Server error :( ... Try to visit this app next day :)');
    }
  }

  const sendQuery = async (
    query: string = searchValue,
    toPage?: number
  ): Promise<void> => {
    if (toPage) setPageNumber(toPage);
    setIsLoading(true);
    setErrorMsg('');
    setIsDetails(false);

    if ('id' in params) {
      navigator('/page/' + toPage + '/details/' + params.id);
      setIsDetails(true);
    } else {
      navigator('/page/' + toPage);
    }

    const response: BackData | Error | false = await getAll(
      query,
      toPage || pageNumber,
      limit
    );

    if (isError(response)) {
      showError(response);
    } else if (response !== false && isData(response[0])) {
      const data: Gif[] = response[0];
      setPages(response[1]);

      setDataState(data);
    } else {
      showError();
    }
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Search sendQuery={sendQuery} />
      </SearchContext.Provider>
      <ErrorBoundaryButton />
      {errorMsg ? (
        <APIError msg={errorMsg} />
      ) : (
        <LimitContext.Provider value={setLimit}>
          <div
            className="api"
            onClick={(): void => {
              navigator('../page/' + pageNumber);
              setIsDetails(false);
            }}
          >
            <DataContext.Provider value={dataState}>
              <APIItems
                isLoading={isLoading}
                details={{ isDetails, setIsDetails }}
              />
            </DataContext.Provider>
            <Outlet />
          </div>
          <Pagination
            pageNumbers={pages}
            activePage={pageNumber}
            setActive={setPageNumber}
            getNewData={sendQuery}
          />
        </LimitContext.Provider>
      )}
    </ErrorBoundary>
  );
}
