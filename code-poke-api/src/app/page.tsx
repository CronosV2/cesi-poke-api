'use client'; // Important pour utiliser useEffect !

import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/10');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError('Erreur lors de la récupération du Pokémon');
        console.error(err);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <main className="p-8">
      {error && <p className="text-red-500">{error}</p>}
      {pokemon ? (
        <div>
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Types: {pokemon.types.map(t => t.type.name).join(', ')}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </main>
  );
}
