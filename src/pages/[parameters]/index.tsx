import React from 'react';
import { wrapper } from '../utils/store';
import { searchGifs, getRunningQueriesThunk } from '../utils/apiSlice';
import Gif from '../components/Gif';
import GifLayout from '../components/Layout/GifLayout';
import Layout from '../components/Layout/Layout';
import { ParametersProps } from '../utils/types';

const App: React.FC = ({
  query,
  page,
  limit,
  responseData,
}: ParametersProps) => {
  const { data: gifs } = responseData.data || {
    data: [],
    pages: { numbers: [], last: 0 },
  };

  return (
    <Layout paginationProps={{ query, page, limit, responseData }}>
      <GifLayout gifs={gifs} isDetails={false} />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params } = context;
    const { parameters: paramsString } = params;

    const paramsArray = paramsString.split('-');

    let query = '',
      page = '',
      limit = '';
    paramsArray.forEach((param) => {
      if (param.startsWith('query=')) {
        query = param.split('query=')[1];
      } else if (param.startsWith('page=')) {
        page = param.split('page=')[1];
      } else if (param.startsWith('limit=')) {
        limit = param.split('limit=')[1];
      }
    });
    store.dispatch(searchGifs.initiate({ query, page, limit }));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    const state = store.getState();
    const queryKey = `searchGifs({"limit":"${limit}","page":"${page}","query":"${query}"})`;
    const responseData = state.giphyApi.queries[queryKey];

    return { props: { query, page, limit, responseData } };

    //IsLoading and isError

    // // Dispatch the searchGifs action
    // const resultAction = await store.dispatch(
    //   searchGifs.initiate({ query, page, limit })
    // );

    // // Extract the query state from the Redux store
    // const state = store.getState();
    // const queryKey = `searchGifs({"limit":"${limit}","page":"${page}","query":"${query}"})`;
    // const queryState = state.giphyApi.queries[queryKey];

    // // Extract isLoading and isError
    // const isLoading = queryState?.isLoading ?? false;
    // const isError = queryState?.isError ?? false;

    // // Pass the extracted values as props
    // return {
    //   props: {
    //     query,
    //     page,
    //     limit,
    //     responseData: queryState?.data,
    //     isLoading,
    //     isError,
    //   },
    // };
  }
);

export default App;
