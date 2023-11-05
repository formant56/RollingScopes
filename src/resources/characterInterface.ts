export type Character = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  order: number;
  weight: number;
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    },
  ];
  results: null;
};

export type EmptySearch = {
  count: number;
  next: string;
  previous: null;
  results: [
    {
      name: string;
    },
  ];
};
