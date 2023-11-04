export default async function fetchPokemon2(
  userInput: string = '',
  page: number
) {
  // if (typeof userInput === 'number') {
  //   page = userInput;
  // } else if (typeof userInput === 'string') {
  //   userInput = userInput.trim();
  // }

  // if (!page) {
  //   page = 1;
  // }
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}${
      userInput ? `&name=${userInput}` : ''
    }`
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
