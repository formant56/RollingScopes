import { ReactNode, useState } from 'react';
import { PaginationProps } from '../../utils/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pagination({
  query,
  page,
  limit,
  responseData,
}: PaginationProps): JSX.Element {
  const { pages: pageNumbers } =
    responseData && responseData.data
      ? responseData.data
      : {
          pages: { numbers: [], last: 0 },
        };
  const router = useRouter();
  const [newLimit, setNewLimit] = useState(limit);
  const last = pageNumbers.last;

  return (
    <div className="controls">
      <div className="pagination">
        <p>{pageNumbers.last}</p>
        {pageNumbers.numbers.includes(1) ? '' : '...'}
        {pageNumbers.numbers.map(
          (item): ReactNode => (
            <Link
              href={`/query=${query}-page=${item}-limit=${limit}`}
              className={item === page ? 'page-number active' : 'page-number'}
              key={item}
              data-testid="page-number"
            >
              {item}
            </Link>
          )
        )}
        {pageNumbers.numbers.includes(last) ? '' : '...'}
      </div>
      <p>{newLimit}</p>
      <div className="pages-count">
        10
        <input
          value={newLimit}
          min={10}
          max={50}
          step={1}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setNewLimit(+event.target.value);
          }}
          onMouseUp={() => {
            router.push(`/query=${query}-page=1-limit=${newLimit}`);
          }}
          className="pages-count-handle"
          type="range"
        />
        50
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  query: '',
  page: 10,
  limit: 10,
  responseData: null,
};
