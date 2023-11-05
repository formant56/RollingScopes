export default async function fetchPokemons(page: number, limit: number) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${
      (page - 1) * limit
    }`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    console.log(limit);
    return data;
  } else {
    console.error('Error fetching data. Status code:', response.status);

    throw new Error('Request failed');
  }
}
