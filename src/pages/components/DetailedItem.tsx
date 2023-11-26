import { isGif } from '../utils/type-guards';
import { useRouter } from 'next/router';
import React from 'react';
import { DetailedGif, DetailedItemProps } from '../utils/types';

export default function DetailedItem({
  oneGif,
}: DetailedItemProps): JSX.Element {
  const router = useRouter();
  let gif: DetailedGif;

  const modalOverlayRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function handleOverlayClick(event: MouseEvent) {
      if (
        modalOverlayRef.current &&
        event.target instanceof Node &&
        !modalOverlayRef.current.contains(event.target as Node)
      ) {
        router.back();
      }
    }

    window.addEventListener('click', handleOverlayClick);

    return () => {
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [router]);

  if (oneGif.data && 'data' in oneGif.data && isGif(oneGif.data.data)) {
    gif = oneGif.data.data;

    return (
      <div
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void =>
          event.stopPropagation()
        }
        className="detailed-item"
        data-testid="detailed-item"
        ref={modalOverlayRef}
      >
        <button
          onClick={() => {
            router.back();
          }}
          className="close"
          data-testid="close"
        >
          +
        </button>
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
