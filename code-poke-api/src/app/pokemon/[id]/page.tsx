'use client';

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
  weight: number;
  height: number; 
}


export default function PokemonDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string>('');
  const [id, setId] = useState<number>(parseInt(params.id));


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

  return (
    <main className="">
      <div className="p-6 shadow-lg" style={{ backgroundColor: typeColors[pokemon?.types[0].type.name as keyof typeof typeColors] }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="text-white text-2xl">
              ←
            </button>
            <h1 className="text-3xl font-bold text-white capitalize">{pokemon?.name}</h1>
          </div>
          <span className="text-white font-bold">#{params.id.padStart(3, '0')}</span>
        </div>

        {pokemon ? (
          <div>
            <div className="">
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-64 h-64 mx-auto"
              />
            </div>

            <div className="bg-white rounded-xl p-4 flex justify-center gap-3 mb-8">
              {pokemon.types.map(t => (
                <span
                  key={t.type.name}
                  className="px-6 py-2 rounded-full text-white font-semibold text-lg"
                  style={{ backgroundColor: typeColors[t.type.name as keyof typeof typeColors] }}
                >
                  {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                </span>
              ))}
              <div className="">
                <p className="text-black">{pokemon.weight/10} kg</p>
                <p className="text-black">{pokemon.height/10} m</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">Chargement...</p>
        )}
      </div>
    </main>
  );
} 