import React from 'react';
import { useNavigate, useNavigation, useLoaderData } from 'react-router-dom';
import { Character } from '../../resources/characterInterface';

export default function ImageView() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useLoaderData() as Character;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const modalOverlayRef = React.useRef<HTMLDivElement | null>(null);

  const onDismiss = React.useCallback(() => {
    navigate('..');
  }, [navigate]);

  React.useEffect(() => {
    function handleOverlayClick(event: MouseEvent) {
      if (
        modalOverlayRef.current &&
        event.target instanceof Node &&
        !modalOverlayRef.current.contains(event.target as Node)
      ) {
        onDismiss();
      }
    }

    window.addEventListener('click', handleOverlayClick);

    return () => {
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [onDismiss]);

  const modalOverlayStyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#13538f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
  };
  if (navigation.state === 'loading') {
    return <h1>Loading!</h1>;
  }

  return (
    <div style={modalOverlayStyle} ref={modalOverlayRef}>
      <div style={modalContentStyle}>
        <h3>Name: {data.name}</h3>
        <p>ID: {data.id}</p>
        <p>Base Experience: {data.base_experience}</p>
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        <h3>Stats</h3>
        <div>
          {data.stats.map((stat, index) => {
            return (
              <p key={index}>
                {stat.stat.name} : {stat.base_stat}
              </p>
            );
          })}
        </div>
        <button ref={buttonRef} onClick={onDismiss}>
          Close
        </button>
      </div>
    </div>
  );
}
