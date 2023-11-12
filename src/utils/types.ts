export interface DataProps {
  data: object[];
}
export interface Gif {
  id: string;
  title: string;
  images: IImage;
}
export interface DetailedGif extends Gif {
  user: User;
  import_datetime: string;
}
interface User {
  display_name: string;
  description: string;
}
export interface ErrorProps {
  msg: string;
}
export interface APIItemProps {
  gif: Gif;
  details: DetailsState;
}
export interface IImage {
  original: IImageOriginal;
  fixed_width_small_still: IImageOriginal;
}
export interface IImageOriginal {
  mp4: string;
  url: string;
}
export interface FindTagProps {
  sendQuery: (query: string, page: number) => void;
}
export interface PaginationProps {
  pageNumbers: Pages;
  activePage: number;
  setActive: (value: number) => void;
  getNewData: (query: undefined, toPage: number) => Promise<void>;
}
export interface PropsPlug {}
export interface QueryState {
  data?: Gif[];
  isLoading: boolean;
  details: DetailsState;
}
interface DetailsState {
  isDetails: boolean;
  setIsDetails: (value: boolean) => void;
}
export interface SearchState {
  searchKeys: string;
  searchResult: string;
}
export interface ErrorState {
  isError: boolean;
}
export interface APIState {
  APIItems: Gif[];
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
export type BackData = [Gif[], Pages];

export interface SearchContextProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
