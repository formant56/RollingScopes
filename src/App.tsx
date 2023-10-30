import './App.css';
import React, { Component } from 'react';
import Search from './Components/SearchBar/Search2';
import Card from './Components/Lower/Card';
import ErrorButton2 from './Components/Lower/ErrorButton2';
import ErrorBoundary from './ErrorBoundary.tsx';

interface ParentState {
  sharedValue: string | null;
}

class ParentComponent extends Component<object, ParentState> {
  state: ParentState = { sharedValue: '' };

  handleValueChange = (newValue: string) => {
    this.setState({ sharedValue: newValue });
  };

  render() {
    return (
      <div className="main">
        <ErrorBoundary>
          <div className="searchComp">
            <Search onValueChange={this.handleValueChange} />
          </div>
          <div className="cardComp">
            <Card sharedValue={localStorage.getItem('searchResult') ?? ''} />
          </div>
          <ErrorButton2 />
        </ErrorBoundary>
      </div>
    );
  }
}

export default ParentComponent;
