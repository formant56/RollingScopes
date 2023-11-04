import React from 'react';
import { Character } from '../../resources/characterInterface';
import CharacterCard from './CharacterCard';
import { useLoaderData, useNavigate, Link, Outlet } from 'react-router-dom';

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
      <div>
        <p>{searchValue}</p>
        <section className="cards">
          {characterObject.map((item) => (
            <Link key={item.id} to={`details/${item.id}`}>
              <CharacterCard key={item.id} character={item} />
            </Link>
          ))}
        </section>
        <Outlet />
      </div>
    );
  }
};

export default Card2;
