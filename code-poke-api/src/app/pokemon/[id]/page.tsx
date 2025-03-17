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
      <div className="shadow-lg" style={{ backgroundColor: typeColors[pokemon?.types[0].type.name as keyof typeof typeColors] }}>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <button onClick={() => router.back()} className="text-white text-2xl">
              ←
            </button>
            <h1 className="text-3xl font-bold text-white capitalize">{pokemon?.name}</h1>
          </div>
          <span className="text-white font-bold">#{params.id.padStart(3, '0')}</span>
        </div>

        {pokemon ? (
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-128 h-128 mx-auto"
              />
            </div>

            <div className="bg-white rounded-t-3xl p-8 pt-24 absolute inset-x-0 top-[65%] min-h-[70vh]">
              <div className="flex justify-center gap-3 mb-8">
                
                {pokemon.types.map(t => (
                  <span
                    key={t.type.name}
                    className="px-6 py-2 rounded-full text-white font-semibold text-lg"
                    style={{ backgroundColor: typeColors[t.type.name as keyof typeof typeColors] }}
                  >
                    {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-semibold text-red-500 mb-6">About</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-black font-bold mb-1">{pokemon.weight/10} kg</p>
                  <p className="text-gray-500 text-sm">Weight</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-black font-bold mb-1">{pokemon.height/10} m</p>
                  <p className="text-gray-500 text-sm">Height</p>
                </div>
                <div className="text-center">
                  <p className="text-black font-bold mb-1">Chlorophyll</p>
                  <p className="text-gray-500 text-sm">Moves</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.
              </p>

              <h2 className="text-2xl font-semibold text-green-500 mb-6">Base Stats</h2>
            </div>
          </div>
        ) : (
          <p className="text-white">Chargement...</p>
        )}
      </div>
    </main>
  );
} 