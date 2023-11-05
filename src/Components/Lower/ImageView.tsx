import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Character } from '../../resources/characterInterface';

export default function ImageView() {
  const navigate = useNavigate();
  const data = useLoaderData() as Character;
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const modalOverlayRef = React.useRef<HTMLDivElement | null>(null);

  const onDismiss = React.useCallback(() => {
    navigate('..');
  }, [navigate]);

  // Add an event listener to the modal overlay to handle clicks outside the modal
  React.useEffect(() => {
    function handleOverlayClick(event: MouseEvent) {
      if (
        modalOverlayRef.current &&
        event.target instanceof Node &&
        !modalOverlayRef.current.contains(event.target as Node)
      ) {
        // Click occurred outside the modal, so trigger the onDismiss function
        onDismiss();
      }
    }

    window.addEventListener('click', handleOverlayClick);

    return () => {
      window.removeEventListener('click', handleOverlayClick);
    };
  }, [onDismiss]);

  // CSS for the modal overlay
  const modalOverlayStyle = {
    // position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  };

  // CSS for the modal content
  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
  };

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
