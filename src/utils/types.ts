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
  activePage: number;
  setActive: (value: number) => void;
  resetPage: (toPage: number) => Promise<void>;
}
export interface QueryState {
  details: DetailsState;
}

export interface GiphyResponse<T> {
  data: T;
  pagination?: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface DetailsState {
  isDetails: boolean;
  setIsDetails: (value: boolean) => void;
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
