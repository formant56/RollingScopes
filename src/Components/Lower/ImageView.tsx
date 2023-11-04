import React from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { Character } from '../../resources/characterInterface';

export default function ImageView() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  function onDismiss() {
    navigate(-1);
  }

  // CSS for the modal overlay
  const modalOverlayStyle = {
    position: 'fixed',
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
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <img src={data.image} alt={data.name} className="card__image" />
        <div className="card__description">
          <p>Name: {data.name}</p>
          <p className="card__status">Status: {data.status}</p>
          <p>Species: {data.species}</p>
          <p>Gender: {data.gender}</p>
          <button ref={buttonRef} onClick={onDismiss}>
            Close
          </button>
        </div>
      </div>
    </div>
    // <div>
    //   <h1 id="label">{image.title}</h1>
    //   <img width={400} height={400} src={image.src} alt="" />
    //   <button ref={buttonRef} onClick={onDismiss}>
    //     Close
    //   </button>
    // </div>
  );
}
