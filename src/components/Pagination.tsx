import { ReactNode } from 'react';
import { PaginationProps } from '../utils/types';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLimitValue, selectLimit } from './paginationSlice';
import { selectSearchkey } from './searchSlice';
import { useSearchGifsQuery } from '../utils/apiSlice';

export default function Pagination({
  activePage,
  setActive,
  resetPage,
}: PaginationProps): JSX.Element {
  const dispatch = useDispatch();
  const itemsOnPage = useSelector(selectLimit);
  const page: number = Number(useParams().page);
  const query = useSelector(selectSearchkey);

  const { data: responseData } = useSearchGifsQuery({
    query: query,
    limit: itemsOnPage,
    page: page,
  });
  const { pages: pageNumbers } = responseData || {
    data: [],
    pages: { numbers: [], last: 0 },
  };

  return (
    <div className="controls">
      <div className="pagination">
        <p>{pageNumbers.last}</p>
        {pageNumbers.numbers.includes(1) ? '' : '...'}
        {pageNumbers.numbers.map(
          (page): ReactNode => (
            <Link
              to={'../page/' + page.toString()}
              onClick={() => {
                setActive(page);
                resetPage(page);
              }}
              className={
                page === activePage ? 'page-number active' : 'page-number'
              }
              key={page}
              data-testid="page-number"
            >
              {page}
            </Link>
          )
        )}
        {pageNumbers.numbers.includes(pageNumbers.last) ? '' : '...'}
      </div>
      <p>{itemsOnPage}</p>
      <div className="pages-count">
        10
        <input
          value={itemsOnPage}
          min={10}
          max={50}
          step={1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            dispatch(setLimitValue(+event.target.value));
          }}
          onClick={(): void => {
            resetPage(1);
          }}
          className="pages-count-handle"
          type="range"
        />
        50
      </div>
    </div>
  );
}
