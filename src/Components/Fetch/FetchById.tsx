export default async function fetchById(id: number) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error('Error fetching data. Status code:', response.status);

    throw new Error('Request failed');
  }
}
