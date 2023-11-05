export type Character = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

export type EmptySearch = {
  count: number;
  next: string;
  previous: null;
  results: {
    name: string;
  }[];
};
