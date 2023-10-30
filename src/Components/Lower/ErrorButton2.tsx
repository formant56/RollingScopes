import React, { Component } from 'react';

interface State {
  count: boolean;
}

class ErrorButton2 extends Component<object, State> {
  state: State = { count: false };

  handleClick() {
    this.setState({ count: true }, () => {
      if (this.state.count) {
        throw new Error('Button Errorr');
      }
    });
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Error Button</button>;
  }
}

export default ErrorButton2;
