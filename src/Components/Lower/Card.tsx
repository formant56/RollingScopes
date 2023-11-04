// import React from 'react';
// import fetchPokemon from '../Fetch/FetchPokemon';
// import { Character } from '../../resources/characterInterface';
// import CharacterCard from './CharacterCard';

// interface SearchProps {
//   searchValue: string;
// }

// const Card: React.FC<SearchProps> = ({ searchValue }) => {
//   const [characterObject, setcharacterObject] = React.useState<
//     Character[] | null
//   >(null);

//   const [page, setPage] = React.useState<number>(1);

//   React.useEffect(() => {
//     fetchData(searchValue);
//   }, [searchValue, page]);

//   const fetchData = async (searchValue: string) => {
//     try {
//       const data = await fetchPokemon(searchValue);
//       console.log(data);
//       setcharacterObject(data.results);

//       //set next page to false if data.pages<=page
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   if (characterObject === null) {
//     return <p>Waiting for correct search input...</p>;
//   } else {
//     return (
//       <div>
//         <section className="cards">
//           {characterObject.map((item) => (
//             <CharacterCard key={item.id} character={item} />
//           ))}
//         </section>
//       </div>
//     );
//   }
// };

// export default Card;
