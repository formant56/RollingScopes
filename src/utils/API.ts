import axios from 'axios';
import { BackData, DetailedGif, Gif, Pages } from './types';
import { hasPagination, isData, isGif } from './type-guards';
import getPages from './pagination';

export default async function getAll(
  query: string,
  page: number,
  limit: number
): Promise<BackData | Error | false> {
  const offset: number = (page - 1) * limit;
  try {
    const response: Response = await axios({
      url: query
        ? 'https://api.giphy.com/v1/gifs/search'
        : 'https://api.giphy.com/v1/gifs/trending',
      params: {
        api_key: 'Ix6tfSYwY66jHf4ouGVs5P3kWqOIQIgP',
        q: query,
        limit,
        offset,
      },
    });

    if (response.status === 200) {
      if (
        'data' in response &&
        isData(response.data) &&
        'data' in response.data &&
        isData(response.data.data)
      ) {
        const data: Gif[] = response.data.data;
        let pages: Pages = { numbers: [], last: 0 };

        if (hasPagination(response.data)) {
          const total: number = response.data.pagination.total_count;
          const maxAPIOffset: number = 5000;
          pages = getPages(
            Math.ceil((total > maxAPIOffset ? maxAPIOffset : total) / limit),
            page
          );
        }

        return [data, pages];
      }
    }
  } catch (error) {
    if (error instanceof Error) return error;
  }
  return false;
}

export async function getOne(id: string): Promise<DetailedGif | Error | false> {
  const url: string = 'https://api.giphy.com/v1/gifs/' + id;
  try {
    const response: Response = await axios({
      url,
      params: {
        api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
        gif_id: id,
      },
    });

    if (response.status === 200) {
      if (
        'data' in response &&
        isData(response.data) &&
        'data' in response.data &&
        isGif(response.data.data)
      ) {
        const gif: DetailedGif = response.data.data;
        return gif;
      }
    }
  } catch (error) {
    if (error instanceof Error) return error;
  }
  return false;
}
