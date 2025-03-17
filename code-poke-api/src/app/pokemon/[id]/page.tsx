'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { typeColors } from '@/utils/color';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getPokemon } from '@/services/pokemonService';
import pokeball from '@/assets/pokeball.svg';
import axios from 'axios';

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
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  species: {
    url: string;
  };
}

interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}

export default function PokemonDetail() {
  const router = useRouter();
  const params = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [description, setDescription] = useState<string>('');
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

  useEffect(() => {
    const fetchPokemonDescription = async () => {
      if (pokemon?.species?.url) {
        try {
          const response = await axios.get(pokemon.species.url);
          const speciesData: PokemonSpecies = response.data;
          
          const EnglishDescription = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'en'
          );
          
          if (EnglishDescription) {
            setDescription(EnglishDescription.flavor_text.replace(/\f/g, ' '));
          }
        } catch (err) {
          console.error('Erreur lors de la récupération de la description');
        }
      }
    };

    fetchPokemonDescription();
  }, [pokemon]);

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
          <span className="text-white font-extrabold">#{currentId.toString().padStart(3, '0')}</span>
        </div>

        {pokemon ? (
          <div className="relative">
            <div className="relative h-[250px]">
              <button 
                onClick={() => navigateToPokemon(currentId - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:scale-110 transition-transform"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
              >
                ←
              </button>
              <img 
                src={pokeball.src} 
                alt="pokeball" 
                width={300}
                height={300}
                className="absolute right-0 -top-[60px] z-10 "
              />
              <button 
                onClick={() => navigateToPokemon(currentId + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-30 hover:scale-110 transition-transform"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
              >
                →
              </button>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -top-[120px] transform -translate-x-1/2 z-30">
                <Image
                  height={300}
                  width={300}
                  src={pokemon.sprites.other['official-artwork'].front_default} 
                  alt={pokemon.name}
                  priority
                  className="mx-auto"
                />
              </div>

              <div className="bg-white rounded-t-3xl p-8 pt-32 min-h-screen relative z-20">
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

                <h2 className="text-2xl font-semibold mb-6"
                  style={{ color: typeColors[pokemon.types[0].type.name as keyof typeof typeColors] }}>
                  About
                </h2>
                
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
                  {description || 'Chargement de la description...'}
                </p>

                <h2 className="text-2xl font-semibold  mb-6"
                 style={{ color: typeColors[pokemon.types[0].type.name as keyof typeof typeColors] }}>
                  Base Stats</h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center gap-4">
                      <div 
                        className="w-12 font-semibold uppercase"
                        style={{ color: typeColors[pokemon.types[0].type.name as keyof typeof typeColors] }}
                      >
                        {pokemon.name === 'special-attack' ? 'SATK' :
                         stat.stat.name === 'special-defense' ? 'SDEF' :
                         stat.stat.name === 'attack' ? 'ATK' :  
                         stat.stat.name === 'defense' ? 'DEF' :
                         stat.stat.name === 'speed' ? 'SPD' : 'HP'}
                      </div>
                      <div className="w-12 text-right font-bold">
                        {stat.base_stat.toString().padStart(3, '0')}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: typeColors[pokemon.types[0].type.name as keyof typeof typeColors],
                            width: `${(stat.base_stat / 255) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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