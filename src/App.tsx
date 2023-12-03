import './App.css';
import React from 'react';
import type { RootState } from './store';
import { useSelector } from 'react-redux';
import FormData from './components/FormData';

const App: React.FC = () => {
  const uncontrolledData = useSelector(
    (state: RootState) => state.uncontrolledState
  );
  const controlledData = useSelector(
    (state: RootState) => state.controlledState
  );
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <nav>
        <ul>
          <li>
            <a href="/uncontrolled-form">Uncontrolled Form</a>
          </li>
          <li>
            <a href="/controlled-form">Controlled Form</a>
          </li>
        </ul>
      </nav>
      <div>
        <div>
          <label>Uncontrolled Data</label>
          <FormData item={uncontrolledData} />
        </div>
        <div>
          <label>Controlled Data</label>
          <FormData item={controlledData} />
        </div>
      </div>
    </div>
  );
};

export default App;
