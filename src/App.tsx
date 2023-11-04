import './App.css';
import React, { useState } from 'react';
import Search from './Components/SearchBar/Search2';
import fetchPokemon2 from './Components/Fetch/FetchPokemon2';
import Card2 from './Components/Lower/Card2';

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
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = React.useState<number>(1);

  const onValueSet = (newValue: string) => {
    setSearchValue(newValue);
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
          path="/:page?"
          element={<Card2 searchValue={searchValue} page={page} />}
          loader={({ params }) => {
            return fetchPokemon2('', params.page);
          }}
        />
        <Route
          path="/:search/:page?"
          element={<Card2 searchValue={searchValue} page={page} />}
          loader={({ params }) => {
            return fetchPokemon2(params.search, params.page);
          }}
        />
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
