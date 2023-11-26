// import '@/styles/globals.css';
import '@/styles/index.css';
import type { AppProps } from 'next/app';
import { wrapper } from './utils/store';
import { Provider } from 'react-redux';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />;
    </Provider>
  );
}
