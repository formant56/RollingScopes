import { ErrorProps } from '../utils/types';

export default function APIError(props: ErrorProps): JSX.Element {
  return (
    <section className="api">
      <h2>{props.msg}</h2>
    </section>
  );
}
