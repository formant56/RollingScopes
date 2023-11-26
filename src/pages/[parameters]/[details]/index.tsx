import React from 'react';
import { wrapper } from '../../utils/store';
import {
  searchGifs,
  getOneGif,
  getRunningQueriesThunk,
} from '../../utils/apiSlice';
import { GetServerSideProps } from 'next';
import GifLayout from '../../components/GifGrid';
import Layout from '../../components/Layout/Layout';
import DetailedItem from '@/pages/components/DetailedItem';
import { useRouter } from 'next/router';
import { DetailedViewProps } from '../../utils/types';

const DetailedView: React.FC<DetailedViewProps> = ({
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
interface Params {
  parameters: string;
  details: string;
}
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { params } = context;
    const { parameters, details } = params as Params;

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

    return { props: { query, page, limit, responseData, oneGif } };
  });

export default DetailedView;
