import { Link } from 'react-router-dom';
import { DetailsState, IGif } from '../utils/types';

interface GifProps {
  gif: IGif;
  details: DetailsState;
}

export default function Gif({ gif, details }: GifProps): JSX.Element {
  return (
    <Link
      to={'details/' + gif.id}
      className="api-item"
      data-testid="gif"
      onClick={(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      ): void => {
        event.stopPropagation();
        details.setIsDetails(true);
      }}
    >
      <h3 className="item-title">{gif.title}</h3>
      <video
        className="item-content"
        poster={gif.images.fixed_width_small_still.url}
        src={gif.images.original.mp4}
        autoPlay
        loop
        muted
      ></video>
    </Link>
  );
}
