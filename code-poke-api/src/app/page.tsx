'use client'; // Important pour utiliser useEffect !

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeColors, PokemonType } from '@/utils/color';
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
  id: number;
}

export default function Home() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string>('');
  const [id, setId] = useState<number>(1);
  const [searchId, setSearchId] = useState<string>('1');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
  }, [id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = parseInt(searchId);
    if (!isNaN(newId)) {
      setId(newId);
    }
  };

  const handlePokemonClick = () => {
    if (pokemon) {
      router.push(`/pokemon/${pokemon.id}`);
    }
  };

  return (
    <main className="p-8">
      <form onSubmit={handleSearch} className="">
        <input className='bg-blue-500 border-1 border-black rounded-md p-2'
          type="number" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          placeholder="Chiffre ici" 
        />
        <button type="submit" className='bg-white border-1 border-black rounded-md p-2 m-3'>Rechercher</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {pokemon ? (
        <div>
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            onClick={handlePokemonClick}
            className="cursor-pointer hover:opacity-80" 
          />
        <p className="mt-4">{pokemon.types.map(t => (
          <span
            key={t.type.name}
            className="px-3 py-1 rounded-full text-white mr-2"
            style={{ backgroundColor: typeColors[t.type.name as keyof typeof typeColors] }}
          >
          {t.type.name}
        </span>
        ))}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </main>
  );
}
