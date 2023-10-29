import React, { Component } from 'react';

interface SearchProps {
  onValueChange: (newValue: string) => void;
}
interface SearchState {
  tempvalue: string;
}
class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      tempvalue: localStorage.getItem('searchResult') || '',
    };
  }
  handleChange = (newValue: string) => {
    this.setState({ tempvalue: newValue });
  };

  submiting = () => {
    this.props.onValueChange(this.state.tempvalue.toLowerCase().trimEnd());
    localStorage.setItem(
      'searchResult',
      this.state.tempvalue.toLowerCase().trimEnd()
    );
  };

  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.tempvalue}
          onChange={(e) => this.handleChange(e.target.value)}
        />

        <button onClick={this.submiting}>Search</button>
      </>
    );
  }
}

export default Search;
