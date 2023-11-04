import './App.css';
import React, { useState } from 'react';
import Search from './Components/SearchBar/Search2';
import fetchPokemon2 from './Components/Fetch/FetchPokemon2';
import fetchById from './Components/Fetch/FetchById';
import Card2 from './Components/Lower/Card2';
import ImageView from './Components/Lower/ImageView';

// import RootLayout from './layouts/RootLayout';
// import fetchPokemon from './Components//Fetch/FetchPokemon';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

//       <Route index element={<Home />} />
//       <Route path="about" element={<About />} />
//     </Route>

const ParentComponent: React.FC<object> = () => {
  const [searchValue, setSearchValue] = useState<string>('search');
  const [page, setPage] = React.useState<number>(1);

  const onValueSet = (newValue: string) => {
    setSearchValue(newValue.trim() === '' ? 'search' : newValue);
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
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Search
            onValueSet={onValueSet}
            pageIncDec={pageIncDec}
            pageReset={pageReset}
          />
        }
      >
        <Route
          path="/:search?/:page?"
          element={<Card2 searchValue={searchValue} page={page} />}
          loader={({ params }) => {
            if (params.search == 'search') {
              return fetchPokemon2('', params.page);
            } else {
              return fetchPokemon2(params.search, params.page);
            }
          }}
        >
          <Route
            path="details/:id"
            element={<ImageView />}
            loader={({ params }) => {
              return fetchById(params.id);
            }}
          ></Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default ParentComponent;

//   return (
//     <div className="main">
//       <div className="searchComp">
//         <Search onValueSet={onValueSet} />
//       </div>
//       <div className="cardComp">
//         <Card
//           searchValue={typeof searchValue === 'string' ? searchValue : ''}
//         />
//       </div>
//       <ErrorButton2 />
//     </div>
//   );
// };
