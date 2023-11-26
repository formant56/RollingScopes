import React from 'react';
import { wrapper } from '../../utils/store';
import {
  searchGifs,
  getOneGif,
  getRunningQueriesThunk,
} from '../../utils/apiSlice';
import GifLayout from '../../components/Layout/GifLayout';
import Layout from '../../components/Layout/Layout';
import DetailedItem from '@/pages/components/DetailedItem';
import { useRouter } from 'next/router';

const DetailedView: React.FC = ({
  query,
  page,
  limit,
  responseData,
  oneGif,
}) => {
  const router = useRouter();
  const { data: gifs } = responseData.data || {
    data: [],
    pages: { numbers: [], last: 0 },
  };

  return (
    <Layout paginationProps={{ query, page, limit, responseData }}>
      <div
        className="api"
        onClick={(): void => {
          router.back();
        }}
      >
        <GifLayout gifs={gifs} isDetails={true} />
        <DetailedItem oneGif={oneGif} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { params } = context;
    const { parameters, details } = params;

    const paramsArray = parameters.split('-');
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
    store.dispatch(getOneGif.initiate(details));
    store.dispatch(searchGifs.initiate({ query, page, limit }));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    const state = store.getState();
    const queryKey = `searchGifs({"limit":"${limit}","page":"${page}","query":"${query}"})`;
    const responseData = state.giphyApi.queries[queryKey];

    const oneGif = state.giphyApi.queries[`getOneGif("${details}")`];
    console.log(oneGif);

    return { props: { query, page, limit, responseData, oneGif } };
  }
);

export default DetailedView;
