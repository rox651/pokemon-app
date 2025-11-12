import { describe, expect, test, jest } from "@jest/globals";
import { PokemonApiAdapter } from "./";
import { axiosClient } from "@/infrastructure/http/axiosClient";
import { mockPokemon } from "@/test/pokemon/mockData";

jest.mock("@/infrastructure/http/axiosClient", () => {
  return {
    axiosClient: {
      get: jest.fn(),
    },
  };
});

const mockedAxiosClientGet = axiosClient.get as jest.MockedFunction<
  (url: string) => Promise<{ data: any }>
>;

describe("PokemonApiAdapter", () => {
  test("Should return Pokémon array", async () => {
    mockedAxiosClientGet.mockResolvedValueOnce({
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

    mockedAxiosClientGet.mockResolvedValueOnce({
      data: mockPokemonData,
    });

    const repo = new PokemonApiAdapter();
    const result = await repo.fetchPokemonByName("pikachu");

    expect(result.name).toBe("pikachu");
    expect(result.id).toBe(25);
    expect(result.abilities.length).toBe(1);
    expect(result.types[0].type.name).toBe("electric");
  });

  test("Should return Pokemon move details by name", async () => {
    const mockMoveData = {
      id: 85,
      name: "thunderbolt",
      power: 90,
      type: {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
      damage_class: {
        name: "special",
        url: "https://pokeapi.co/api/v2/move-damage-class/3/",
      },
      accuracy: 100,
      pp: 15,
    };

    mockedAxiosClientGet.mockResolvedValueOnce({
      data: mockMoveData,
    });

    const repo = new PokemonApiAdapter();
    const result = await repo.fetchPokemonMoveByName("thunderbolt");

    expect(result.id).toBe(85);
    expect(result.name).toBe("thunderbolt");
    expect(result.power).toBe(90);
    expect(result.type).toBe("electric");
    expect(result.damage_class.name).toBe("special");
    expect(result.accuracy).toBe(100);
    expect(result.pp).toBe(15);
  });

  test("Should return Pokemon type information", async () => {
    const mockTypeData = {
      id: 13,
      name: "electric",
      damage_relations: {
        double_damage_from: [
          { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
        ],
        double_damage_to: [
          { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
          { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
        ],
        half_damage_from: [
          { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
          { name: "steel", url: "https://pokeapi.co/api/v2/type/9/" },
          { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
        ],
        half_damage_to: [
          { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
          { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
          { name: "dragon", url: "https://pokeapi.co/api/v2/type/16/" },
        ],
        no_damage_from: [],
        no_damage_to: [
          { name: "ground", url: "https://pokeapi.co/api/v2/type/5/" },
        ],
      },
    };

    mockedAxiosClientGet.mockResolvedValueOnce({
      data: mockTypeData,
    });

    const repo = new PokemonApiAdapter();
    const result = await repo.fetchPokemonTypes("electric");

    expect(result.id).toBe(13);
    expect(result.name).toBe("electric");
    expect(result.damage_relations.double_damage_from.length).toBe(1);
    expect(result.damage_relations.double_damage_from[0].name).toBe("ground");
    expect(result.damage_relations.double_damage_to.length).toBe(2);
    expect(result.damage_relations.no_damage_to.length).toBe(1);
  });
});
