import { create } from "zustand";
import type { PokemonSlice } from "./pokemon";
import { createPokemonSlice } from "./pokemon";

type RootState = PokemonSlice;

const useStore = create<RootState>()((...a) => ({
  ...createPokemonSlice(...a),
}));

export default useStore;
