import { Component, ReactNode } from 'react';
import { ErrorState } from '../utils/types';

class ErrorBoundaryButton extends Component {
  public state: ErrorState = { isError: false };
  private explode = (): void => {
    this.setState({ isError: true });
  };
  render(): ReactNode {
    if (this.state.isError) {
      throw new Error('BOOM! A controlled error has occurred.');
    }
    return (
      <button onClick={this.explode} className="error-button">
        Crash the App!
      </button>
    );
  }
}

export default ErrorBoundaryButton;
