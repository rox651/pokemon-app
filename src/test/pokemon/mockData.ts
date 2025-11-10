import type { Pokemon } from "@/domain/entities/pokemon";

export const mockPokemon: Pokemon = {
  name: "pikachu",
  id: 25,
  abilities: [
    {
      ability: {
        name: "magnet-pull",
        url: "https://pokeapi.co/api/v2/ability/42/",
      },
      is_hidden: false,
      slot: 1,
    },
  ],
  base_experience: 112,
  height: 4,
  weight: 60,
  types: [
    {
      slot: 1,
      type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
    },
  ],
  order: 1,
  species: {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon-species/25/",
  },
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  moves: [],
  stats: [],
};
