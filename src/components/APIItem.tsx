import { Link } from 'react-router-dom';
import { APIItemProps } from '../utils/types';

export default function APIItem(props: APIItemProps): JSX.Element {
  return (
    <Link
      to={'details/' + props.gif.id}
      className="api-item"
      onClick={(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
      ): void => {
        event.stopPropagation();
        props.details.setIsDetails(true);
      }}
    >
      <h3 className="item-title">{props.gif.title}</h3>
      <video
        className="item-content"
        poster={props.gif.images.fixed_width_small_still.url}
        src={props.gif.images.original.mp4}
        autoPlay
        loop
        muted
      ></video>
    </Link>
  );
}
