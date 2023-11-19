import { Component, ReactNode } from 'react';
import { ErrorState } from '../utils/types';

interface Props {
  children?: ReactNode;
}

class ErrorBoundary extends Component<Props, ErrorState> {
  public constructor(props: Props) {
    super(props);
    this.state = { isError: false };
  }
  componentDidCatch(): void {
    this.setState({ isError: true });
  }
  render(): ReactNode {
    if (this.state.isError)
      return (
        <h2 className="manual-error">
          Managed error. It is ok, just refresh the page :)
        </h2>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
