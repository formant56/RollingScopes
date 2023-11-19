import React from 'react';
import './styles.css';

const NotFound: React.FC = () => {
  return (
    <div className="page-404">
      <h1>OOPS!</h1>
      <h2 data-testid="message">That page cannot be found.</h2>
    </div>
  );
};
export default NotFound;
