export default async function fetchByName(userInput: string = '') {
  // if (typeof userInput === 'number') {
  //   page = userInput;
  // } else if (typeof userInput === 'string') {
  //   userInput = userInput.trim();
  // }

  // if (!page) {
  //   page = 1;
  // }
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${userInput}`
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
