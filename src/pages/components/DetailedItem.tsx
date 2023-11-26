import { isGif } from '../utils/type-guards';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IGif } from '../utils/types';

interface DetailedItemProps {
  data: IGif;
}

export default function DetailedItem({
  oneGif,
}: DetailedItemProps): JSX.Element {
  const router = useRouter();
  let gif;
  const data = oneGif.data;
  const modalOverlayRef = React.useRef<HTMLDivElement | null>(null);

  if (data && 'data' in data && isGif(data.data)) {
    gif = data.data;
  }

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
  // } else {
  //   return <p>Nothing to see</p>;
  // }
}
