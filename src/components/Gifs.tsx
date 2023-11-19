import Gif from './Gif';
import { QueryState } from '../utils/types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSearchGifsQuery } from '../utils/apiSlice';
import { selectLimit } from './paginationSlice';
import { selectSearchkey } from './searchSlice';
import { setLoadingValue } from './loadingSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function Gifs({ details }: QueryState): JSX.Element {
  const isDetails: boolean = !!useParams().id;
  const page: number = Number(useParams().page);
  const limit = useSelector(selectLimit);
  const query = useSelector(selectSearchkey);

  const {
    data: responseData,
    error,
    isLoading,
  } = useSearchGifsQuery({
    query: query,
    limit: limit,
    page: page,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingValue(isLoading));
  }, [dispatch, isLoading]);

  const { data: gifs } = responseData || {
    data: [],
    pages: { numbers: [], last: 0 },
  };

  if (error) {
    return (
      <div>
        <section className="api-items">Unexpected error</section>; Error:
      </div>
    );
  }
  if (isLoading)
    return (
      <section className="api-items">
        <span className="loader"></span>
      </section>
    );

  if (gifs) {
    const classes: string =
      'api-items' + (details.isDetails && isDetails ? ' half' : '');
    return (
      <section className={classes}>
        {gifs.length ? (
          gifs.map((item) => <Gif gif={item} key={item.id} details={details} />)
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
    );
  }
  return <></>;
}
