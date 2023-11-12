import { useContext } from 'react';
import APIItem from './APIItem';
import { QueryState, Gif } from '../utils/types';
import { useParams } from 'react-router-dom';
import { DataContext } from '../utils/contexts';

export default function APIItems(props: QueryState): JSX.Element {
  const isDetails: boolean = !!useParams().id;
  const data: Gif[] = useContext(DataContext);
  if (props.isLoading) {
    return (
      <section className="api-items">
        <span className="loader"></span>
      </section>
    );
  } else if (data) {
    const classes: string =
      'api-items' + (props.details.isDetails && isDetails ? ' half' : '');
    return (
      <section className={classes}>
        {data.length ? (
          data.map((item) => (
            <APIItem
              data-testid="card"
              gif={item}
              key={item.id}
              details={props.details}
            />
          ))
        ) : (
          <h2>Sorry, there is nothing to show you :(</h2>
        )}
      </section>
    );
  } else {
    return <section className="api-items">Unexpected error</section>;
  }
}
