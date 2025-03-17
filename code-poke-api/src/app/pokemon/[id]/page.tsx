'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { typeColors, PokemonType } from '@/utils/color';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getPokemon } from '@/services/pokemonService';

interface Pokemon {
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  weight: number;
  height: number; 
}

export default function PokemonDetail() {
  const router = useRouter();
  const params = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const currentId = params?.id ? parseInt(params.id as string) : 1;

  const navigateToPokemon = (newId: number) => {
    if (newId >= 1 && newId <= 151) {  
      router.push(`/pokemon/${newId}`);
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemon(currentId.toString());
        setPokemon(data);
      } catch (err) {
        toast.error('Erreur lors de la récupération du Pokémon');
      }
    };

    fetchPokemon();
  }, [currentId]);

  return (
    <main className="">
      <div className="shadow-lg" style={{ backgroundColor: typeColors[pokemon?.types[0].type.name as keyof typeof typeColors] }}>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/')} className="text-white  text-2xl hover:scale-110 transition-transform">
              ←
            </button>
            <h1 className="text-3xl font-bold text-white capitalize">{pokemon?.name}</h1>
          </div>
          <span className="text-white font-bold">#{currentId.toString().padStart(3, '0')}</span>
        </div>

        {pokemon ? (
          <div className="relative">
            <button 
              onClick={() => navigateToPokemon(currentId - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:scale-110 transition-transform"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              ←
            </button>
            
            <button 
              onClick={() => navigateToPokemon(currentId + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:scale-110 transition-transform"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
            >
              →
            </button>

            <div className="relative z-10">
              <Image
              height={128}
              width={128}
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name}
                className="mx-auto"
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