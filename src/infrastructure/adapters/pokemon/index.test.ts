import { describe, expect, test, jest } from "@jest/globals";
import { PokemonApiAdapter } from "./";
import { axiosClient } from "@/infrastructure/http/axiosClient";
import { mockPokemon } from "@/test/pokemon/mockData";

import type { Pokemon, PokemonMetadata } from "@/domain/entities/pokemon";

jest.mock("@/infrastructure/http/axiosClient", () => {
  return {
    axiosClient: {
      get: jest.fn(),
    },
  };
});

const mockedAxiosClientGetAllPokemons = axiosClient.get as jest.MockedFunction<
  () => Promise<{ data: { results: PokemonMetadata[] } }>
>;

const mockedAxiosClientGetPokemonByName =
  axiosClient.get as jest.MockedFunction<
    (name: string) => Promise<{ data: Pokemon }>
  >;

describe("PokemonApiAdapter", () => {
  test("Should return Pokémon array", async () => {
    mockedAxiosClientGetAllPokemons.mockResolvedValueOnce({
      data: {
        results: [
          {
            name: "pikachu",
            url: "https://pokeapi.co/api/v2/pokemon/25",
          },
        ],
      },
    });

    const repo = new PokemonApiAdapter();
    const result = await repo.fetchAllPokemons();

    expect(result[0].name).toBe("pikachu");
  });

  test("Should return full Pokemon details by name", async () => {
    const mockPokemonData = mockPokemon;

    mockedAxiosClientGetPokemonByName.mockResolvedValueOnce({
      data: mockPokemonData,
    });

    const repo = new PokemonApiAdapter();
    const result = await repo.fetchPokemonByName("pikachu");

    expect(result.name).toBe("pikachu");
    expect(result.id).toBe(25);
    expect(result.abilities.length).toBe(1);
    expect(result.types[0].type.name).toBe("electric");
  });

  test("Should return full Pokemon details by name", async () => {
    const mockPokemonData = mockPokemon;

    mockedAxiosClientGetPokemonByName.mockResolvedValueOnce({
      data: mockPokemonData,
    });

    const repo = new PokemonApiAdapter();
    const result = await repo.fetchPokemonByName("pikachu");

    expect(result.name).toBe("pikachu");
    expect(result.id).toBe(25);
    expect(result.abilities.length).toBe(1);
    expect(result.types[0].type.name).toBe("electric");
  });
});
