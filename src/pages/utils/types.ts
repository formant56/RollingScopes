export interface IGif {
  id: string;
  title: string;
  images: IImage;
}
export interface DetailedGif extends IGif {
  user: User;
  import_datetime: string;
}
interface User {
  display_name: string;
  description: string;
}
export interface IImage {
  original: ImageOriginal;
  fixed_width_small_still: ImageSmall;
}
export interface ImageOriginal {
  mp4: string;
  url: string;
}
export interface ImageSmall {
  url: string;
}
export interface PaginationProps {
  query: string;
  page: number;
  limit: number;
  responseData: {
    data: {
      data: [];
      pages: {
        numbers: [];
        last: number;
      };
    };
  };
}

export interface GiphyResponse<T> {
  data: T;
  pagination?: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface DataWithPagination {
  pagination: Pagination;
}
interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}
export interface Pages {
  numbers: number[];
  last: number;
}
export interface BackData {
  data: IGif[];
  pages: Pages;
}

export interface ParametersProps {
  query: string;
  page: number;
  limit: number;
  responseData: {
    data: BackData;
  };
}

export interface IContext {
  setLimit?: (value: number) => void;
  searchKey?: string;
  setSearchKey?: (value: string) => void;
  gifs?: IGif[];
}
export interface ErrorState {
  isError: boolean;
}

export type GetAllParams = { query: string; page: number; limit: number };
