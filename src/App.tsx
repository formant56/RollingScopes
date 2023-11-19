import { useEffect, useState } from 'react';
import Search from './components/Search';
import ErrorTriggerButton from './components/ErrorTriggerButton';
import ErrorBoundary from './components/ErrorBoundary';
import Gifs from './components/Gifs';
import Pagination from './components/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSearchkey } from './components/searchSlice';

const App: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(Number(useParams().page));
  const [isDetails, setIsDetails] = useState(false);
  const searchKey = useSelector(selectSearchkey);

  const navigator = useNavigate();
  const params = useParams();

  useEffect(() => {
    resetPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const resetPage = async (toPage?: number): Promise<void> => {
    if (toPage) setPageNumber(toPage);
    setIsDetails(false);

    if ('id' in params) {
      navigator('/page/' + toPage + '/details/' + params.id);
      setIsDetails(true);
    } else {
      navigator('/page/' + toPage);
    }
  };

  return (
    <ErrorBoundary>
      <Search />
      <ErrorTriggerButton />
      <>
        <div
          className="api"
          onClick={(): void => {
            navigator('../page/' + pageNumber);
            setIsDetails(false);
          }}
        >
          <Gifs details={{ isDetails, setIsDetails }} />
          <Outlet />
        </div>
        <Pagination
          activePage={pageNumber}
          setActive={setPageNumber}
          resetPage={resetPage}
        />
      </>
    </ErrorBoundary>
  );
};

export default App;
