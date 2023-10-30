import React, { Component } from 'react';
import fetchPokemon from '../Fetch/FetchPokemon';

interface SearchProps {
  sharedValue: string;
}

interface DataObject {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    },
  ];
}

interface DataObjectEmpty {
  count: number;
  next: string;
  previous: null;
  results: [
    {
      name: string;
    },
  ];
}

interface CardState {
  dataObject: DataObject | DataObjectEmpty | null;
}

function isDataObject(obj: DataObject | DataObjectEmpty): obj is DataObject {
  return 'id' in obj;
}

class Card extends Component<SearchProps, CardState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      dataObject: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.sharedValue !== this.props.sharedValue) {
      this.fetchData();
    }
  }

  async fetchData() {
    try {
      const data = await fetchPokemon(this.props.sharedValue);
      console.log(data);
      this.setState({ dataObject: data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    const { dataObject } = this.state;

    if (this.props.sharedValue === '') {
      if (dataObject !== null) {
        if (!isDataObject(dataObject)) {
          return (
            <>
              <h1>Search for a pokemon!</h1>
              <h2>Pokemon examples</h2>
              <ul>
                {dataObject.results.map((p) => (
                  <li key={p.name}>{p.name} </li>
                ))}
              </ul>
            </>
          );
        }
      }
    }

    if (dataObject === null) {
      return <p>Waiting for correct search input...</p>;
    }

    if (isDataObject(dataObject)) {
      return (
        <div>
          <h3>Name: {dataObject.name}</h3>
          <p>ID: {dataObject.id}</p>
          <p>Base Experience: {dataObject.base_experience}</p>
          <p>Height: {dataObject.height}</p>
          <p>Weight: {dataObject.weight}</p>
          <h3>Stats</h3>
          <div>
            {dataObject.stats.map((stat, index) => {
              return (
                <p key={index}>
                  {stat.stat.name} : {stat.base_stat}
                </p>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default Card;
