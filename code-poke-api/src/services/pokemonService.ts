import axios from 'axios';

const pokemonCache = new Map<string, any>();

export const getPokemon = async (id: string) => {
  // Si le Pokémon est déjà en cache, on le retourne
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id);
  }

  // Sinon, on fait l'appel API et on met en cache
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  pokemonCache.set(id, response.data);
  return response.data;
};