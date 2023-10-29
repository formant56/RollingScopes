export default async function fetchPokemon(Pokemon: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error('Error fetching data. Status code:', response.status);

    throw new Error('Request failed');
  }
}
