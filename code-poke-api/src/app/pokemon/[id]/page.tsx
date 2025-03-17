'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeColors, PokemonType } from '@/utils/color';

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);


  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
  }, [params.id]);

  return (
    <main className="p-8">
      <button 
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Retour
      </button>
      
      {pokemon ? (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">{pokemon.name}</h1>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="w-48 h-48"
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
          <p className="mt-4">Taille: {pokemon.height}</p>
          <p className="mt-4">Poids: {pokemon.weight}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </main>
  );
} 