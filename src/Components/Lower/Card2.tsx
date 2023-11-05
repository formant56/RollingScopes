import React from 'react';
import { Character } from '../../resources/characterInterface';
import CharacterCard from './CharacterCard';
import { useLoaderData, useNavigate, NavLink, Outlet } from 'react-router-dom';

interface SearchProps {
  searchValue: string;
  page: number;
}

const Card2: React.FC<SearchProps> = ({ searchValue, page }) => {
  const data = useLoaderData();
  const [characterObject, setcharacterObject] = React.useState<
    Character[] | null
  >(data.results);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (searchValue == '') {
      navigate(`/${page}`);
    } else {
      navigate(`/${searchValue}/${page}`);
    }
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
          <p>{searchValue}</p>
          <section className="cards">
            {characterObject.map((item) => (
              <NavLink key={item.name} to={`details/${item.name}`}>
                <CharacterCard key={item.name} character={item} />
              </NavLink>
            ))}
          </section>
        </div>
        <Outlet />
      </div>
    );
  }
};

export default Card2;
