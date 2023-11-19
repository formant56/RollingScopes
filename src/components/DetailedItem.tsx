import { Link, useParams } from 'react-router-dom';
import { isGif } from '../utils/type-guards';
import { useGetOneGifQuery } from '../utils/apiSlice';
import { setLoadingValue } from './loadingSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function DetailedItem(): JSX.Element {
  const id: string | undefined = useParams().id;
  const page: string | undefined = useParams().page;
  let gif;
  const { data, error, isLoading } = useGetOneGifQuery(id ?? '');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingValue(isLoading));
  }, [dispatch, isLoading]);

  if (data && 'data' in data && isGif(data.data)) {
    gif = data.data;
  }
  if (isLoading) {
    return (
      <div className="detailed-item loading" data-testid="loading">
        <span className="loader bigger"></span>
      </div>
    );
  } else if (error) {
    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
      >
        <Link to={'../../page/' + page} className="close">
          +
        </Link>
        Error: {error.message}
      </div>
    );
  } else if (gif) {
    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
        data-testid="detailed-item"
      >
        <Link to={'../../page/' + page} className="close" data-testid="close">
          +
        </Link>
        <h2>{gif.title}</h2>
        <video
          className="item-content"
          poster={gif.images.fixed_width_small_still.url}
          src={gif.images.original.mp4}
          autoPlay
          loop
          muted
        ></video>
        <div className="info">
          <h3>Author: {gif.user?.display_name || 'noname'}</h3>
          <p>{gif.user?.description}</p>
        </div>
      </div>
    );
  } else {
    return <p>Nothing to see</p>;
  }
}
