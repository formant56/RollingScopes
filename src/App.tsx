import './App.css';
import React, { useState } from 'react';
import Search from './Components/SearchBar/Search2';
import Card from './Components/Lower/Card';
import ErrorButton2 from './Components/Lower/ErrorButton2';
import ErrorBoundary from './ErrorBoundary.tsx';

interface ParentState {
  sharedValue: string | null;
}

const ParentComponent: React.FC<object> = () => {
  const [parentState, setParentState] = useState<ParentState>({
    sharedValue: '',
  });

  const handleValueChange = (newValue: string) => {
    setParentState({ sharedValue: newValue });
  };

  return (
    <div className="main">
      <ErrorBoundary>
        <div className="searchComp">
          <Search onValueChange={handleValueChange} />
        </div>
        <div className="cardComp">
          <Card
            sharedValue={typeof parentState === 'string' ? parentState : ''}
          />
        </div>
        <ErrorButton2 />
      </ErrorBoundary>
    </div>
  );
};

export default ParentComponent;
