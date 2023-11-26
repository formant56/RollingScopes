import { IGif } from '../utils/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface GifProps {
  gif: IGif;
  isDetails: boolean;
}

export default function Gif({ gif, isDetails }: GifProps): JSX.Element {
  const router = useRouter();
  const currentPath = router.asPath;

  const gifContent = (
    <>
      <h3 className="item-title">{gif.title}</h3>
      <video
        className="item-content"
        poster={gif.images.fixed_width_small_still.url}
        src={gif.images.original.mp4}
        autoPlay
        loop
        muted
      ></video>
    </>
  );

  if (isDetails) {
    return gifContent;
  } else {
    return (
      <Link
        href={`${currentPath}/${gif.id}`}
        className="api-item"
        data-testid="gif"
        onClick={(
          event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ): void => {
          event.stopPropagation();
        }}
      >
        {gifContent}
      </Link>
    );
  }
}
