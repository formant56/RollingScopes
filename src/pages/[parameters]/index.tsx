import React from 'react';
import { wrapper } from '../utils/store';
import { searchGifs, getRunningQueriesThunk } from '../utils/apiSlice';
import Gif from '../components/Gif';
import GifLayout from '../components/GifGrid';
import Layout from '../components/Layout/Layout';
import { ParametersProps } from '../utils/types';
import { GetServerSideProps, NextPage } from 'next';

const App: React.FC<ParametersProps> = ({
  query,
  page,
  limit,
  responseData,
}) => {
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
interface Params {
  parameters: string;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { params } = context;
    const { parameters: paramsString } = params as Params;

    const paramsArray = paramsString.split('-');

    let query = '',
      page = '',
      limit = '';
    paramsArray.forEach((param: string) => {
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
  });

export default App;
