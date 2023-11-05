import React from 'react';
import { Character } from '../../resources/characterInterface';
import CharacterCard from './CharacterCard';
import { useLoaderData, useNavigate, NavLink, Outlet } from 'react-router-dom';

interface SearchProps {
  searchValue: string;
  page: number;
  pageIncDec: (operation: 'increase' | 'decrease') => void;
}

const Card2: React.FC<SearchProps> = ({ searchValue, page, pageIncDec }) => {
  const data = useLoaderData();
  const [characterObject, setcharacterObject] = React.useState<
    Character[] | null
  >(data.results);

  const navigate = useNavigate();

  React.useEffect(() => {
    // if (searchValue == '') {
    //   navigate(`/${page}`);
    // } else {
    navigate(`/${searchValue}/${page}`);
  }, [searchValue, page, navigate]);

  React.useEffect(() => {
    setcharacterObject(data.results);
  }, [data]);

  if (characterObject === null) {
    return <p>Waiting for correct search input...</p>;
  } else {
    return (
      <div className="split">
        <div>
          <div className="navbutton">
            <>
              {data.previous && (
                <button onClick={() => pageIncDec('decrease')}>
                  Prev Page
                </button>
              )}
            </>
            <>
              {data.next && (
                <button onClick={() => pageIncDec('increase')}>
                  Next Page
                </button>
              )}
            </>
          </div>

          <p>{searchValue}</p>
          {searchValue == 'search' ? (
            <section className="cards">
              {characterObject.map((item) => (
                <NavLink key={item.name} to={`details/${item.name}`}>
                  <CharacterCard key={item.name} character={item} />
                </NavLink>
              ))}
            </section>
          ) : (
            <div>
              <h3>Name: {data.name}</h3>
              <p>ID: {data.id}</p>
              <p>Base Experience: {data.base_experience}</p>
              <p>Height: {data.height}</p>
              <p>Weight: {data.weight}</p>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    );
  }
};

export default Card2;
