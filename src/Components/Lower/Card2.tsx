import React from 'react';
import { Character } from '../../resources/characterInterface';
import CharacterCard from './CharacterCard';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';

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

  // React.useEffect(() => {
  //   if (searchValue == '') {
  //     if (page === 1) {
  //       navigate(location.pathname); // Keep the route as is
  //     } else {
  //       navigate(`/${page}`);
  //     }
  //   } else {
  //     navigate(`/${searchValue}/${page}`);
  //   }
  // }, [searchValue, page]);

  React.useEffect(() => {
    setcharacterObject(data.results);
  }, [data]);

  // const fetchData = async (searchValue: string) => {
  //   try {
  //     const data = await fetchPokemon(searchValue);
  //     console.log(data);
  //     setcharacterObject(data.results);

  //     //set next page to false if data.pages<=page
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  if (characterObject === null) {
    return <p>Waiting for correct search input...</p>;
  } else {
    return (
      <div>
        <p>{searchValue}</p>
        <Link to="./2">hello</Link>
        <section className="cards">
          {characterObject.map((item) => (
            <CharacterCard key={item.id} character={item} />
          ))}
        </section>
        {/* <Outlet/> Outlet should go here to open new window  */}
      </div>
    );
  }
};

export default Card2;
