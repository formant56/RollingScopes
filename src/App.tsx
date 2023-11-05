import './App.css';
import React, { useState } from 'react';
import Search from './Components/SearchBar/Search2';
import fetchByName from './Components/Fetch/FetchByName';
import fetchPokemons from './Components/Fetch/FetchPokemon';
import Card2 from './Components/Lower/Card2';
import ImageView from './Components/Lower/ImageView';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const ParentComponent: React.FC<object> = () => {
  const [searchValue, setSearchValue] = useState<string>('search');
  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(20);

  const onValueSet = (newValue: string) => {
    setSearchValue(newValue.trim() === '' ? 'search' : newValue);
  };

  const onLimitSet = (resultsPP: number) => {
    setLimit(resultsPP);
  };

  const pageIncDec = (operation: 'increase' | 'decrease') => {
    if (operation === 'increase') {
      setPage((p) => {
        return p + 1;
      });
      console.log('increase');
    } else if (operation === 'decrease') {
      setPage((p) => {
        if (p == 1) return p;
        return p - 1;
      });
    }
  };

  const pageReset = () => {
    setPage(1);
    console.log('page to 1');
    console.log(limit);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Search
            onValueSet={onValueSet}
            pageReset={pageReset}
            onLimitSet={onLimitSet}
            limit={limit}
          />
        }
      >
        <Route
          path="/:search?/:page?"
          element={
            <Card2
              searchValue={searchValue}
              page={page}
              pageIncDec={pageIncDec}
            />
          }
          loader={({ params }) => {
            if (params.search == 'search') {
              return fetchPokemons(params.page, limit);
            } else {
              return fetchByName(params.search);
            }
          }}
        >
          <Route
            path="details/:name"
            element={<ImageView />}
            loader={({ params }) => {
              return fetchByName(params.name);
            }}
          ></Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default ParentComponent;
