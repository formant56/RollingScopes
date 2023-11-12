import { Link, useParams } from 'react-router-dom';
import { getOne } from '../utils/API';
import { useEffect, useState } from 'react';
import { DetailedGif } from '../utils/types';
import { isGif } from '../utils/type-guards';

export default function DetailedItem(): JSX.Element {
  const [gif, setGif] = useState<DetailedGif>();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>();
  const id: string | undefined = useParams().id;
  const page: string | undefined = useParams().page;

  async function showDetails(id: string): Promise<void> {
    setIsLoading(true);
    const response: false | DetailedGif | Error = await getOne(id);
    if (response === false) {
      setError('Server error :( ... Try to change gif :)');
    } else if (isGif(response)) {
      setError('');
      setGif(response);
    } else setError(response.message);
    setIsLoading(false);
  }

  useEffect(() => {
    if (id) showDetails(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="detailed-item loading">
        <p>loading...</p>
        <span className="loader bigger"></span>
      </div>
    );
  } else if (gif) {
    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
      >
        <Link to={'../../page/' + page} className="close" onClick={() => {}}>
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
    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
      >
        <Link to={'../../page/' + page} className="close" onClick={() => {}}>
          +
        </Link>
        {error}
      </div>
    );
  }
}
