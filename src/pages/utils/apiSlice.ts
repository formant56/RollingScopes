import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  DetailedGif,
  Pages,
  IGif,
  BackData,
  GiphyResponse,
  GetAllParams,
} from './types';
import { hasPagination } from './type-guards';
import getPages from './pagination';
import { HYDRATE } from 'next-redux-wrapper';

const giphyApi = createApi({
  reducerPath: 'giphyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.giphy.com/v1/gifs' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    searchGifs: builder.query<BackData, GetAllParams>({
      query: ({ query, page, limit }) => {
        const offset = (page - 1) * limit;
        return {
          url: query ? '/search' : '/trending',
          params: {
            api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
            q: query,
            limit,
            offset,
          },
        };
      },
      transformResponse: (
        response: GiphyResponse<IGif[]>,
        meta,
        arg
      ): BackData => {
        let pages: Pages = { numbers: [], last: 0 };

        if (hasPagination(response)) {
          const total: number = response.pagination.total_count;
          const maxAPIOffset: number = 5000;
          pages = getPages(
            Math.ceil(
              (total > maxAPIOffset ? maxAPIOffset : total) / arg.limit
            ),
            arg.page
          );
        }

        return { data: response.data, pages };
      },
    }),
    getOneGif: builder.query<DetailedGif | Error, string>({
      query: (id) => {
        return {
          url: id,
          params: {
            api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
            gif_id: id,
          },
        };
      },
    }),
  }),
});
export const {
  useSearchGifsQuery,
  useGetOneGifQuery,
  util: { getRunningQueriesThunk },
} = giphyApi;
export const { searchGifs, getOneGif } = giphyApi.endpoints;

export default giphyApi;
