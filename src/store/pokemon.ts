import type { PokemonAdapted } from "@/domain/entities/pokemon";
import type { StateCreator } from "zustand";

type PlayStatus = "idle" | "playing" | "win" | "lose" | "loading";

export interface PokemonSlice {
  status: PlayStatus;
  pokemonFromPlayer: PokemonAdapted | null;
  pokemonFromComputer: PokemonAdapted | null;
  setStatus: (status: PlayStatus) => void;
  setPokemonFromPlayer: (pokemon: PokemonAdapted | null) => void;
  setPokemonFromComputer: (pokemon: PokemonAdapted | null) => void;
  selectedPokemonForModal: PokemonAdapted | null;
  setSelectedPokemonForModal: (pokemon: PokemonAdapted | null) => void;
}

export const createPokemonSlice: StateCreator<
  PokemonSlice,
  [],
  [],
  PokemonSlice
> = (set) => ({
  status: "idle",
  pokemonFromPlayer: null,
  pokemonFromComputer: null,
  setStatus: (status) => set({ status }),
  setPokemonFromPlayer: (pokemon) => set({ pokemonFromPlayer: pokemon }),
  setPokemonFromComputer: (pokemon) => set({ pokemonFromComputer: pokemon }),
  selectedPokemonForModal: null,
  setSelectedPokemonForModal: (pokemon) =>
    set({ selectedPokemonForModal: pokemon }),
});
