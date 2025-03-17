'use client'; // Important pour utiliser useEffect !

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeColors, PokemonType } from '@/utils/color';
import search from '@/assets/search.svg';
import littlepokeball from '@/assets/littlepokeball.svg';

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
      <div className="flex items-center gap-4 mb-4">
        <img src={littlepokeball.src} alt="littlepokeball" className="w-10 h-10" />
        <h1 className="text-6xl font-extrabold text-white">Pokédex</h1>
      </div>
      <form onSubmit={handleSearch} className="relative">
        <input 
          className='bg-white border-1 border-black rounded-full p-4 font-extralight pl-12 w-64'
          type="number" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          placeholder="Search" 
        />
        <img 
          src={search.src} 
          alt="search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </form>
      {error && <p className="text-yellow-500">{error}</p>}
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
