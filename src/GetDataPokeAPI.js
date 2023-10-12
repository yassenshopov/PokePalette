import React, { useState } from 'react';
import axios from 'axios';

function GetDataPokeAPI() {
  const [data, setData] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=1010'); // Adjust the limit as needed
      // Transform the data in the format:
      // {"bulbasaur": 1, "ivysaur": 1, ...}
        const transformed = response.data.results.reduce((acc, curr, i) => {
            const pokemonName = curr.name;
            acc[pokemonName] = i + 1;
            return acc;
        }, {});
        setData(transformed);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const saveDataToFile = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pokemon_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{zIndex: 11}}>
      <button onClick={fetchPokemonData}>Fetch Pokemon Data</button>
      <button onClick={saveDataToFile} disabled={!data}>Save Data to JSON</button>
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}

export default GetDataPokeAPI;
