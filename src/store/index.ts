import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PokemonSlice } from "./pokemon";
import { createPokemonSlice } from "./pokemon";

type RootState = PokemonSlice;

const useStore = create<RootState>()(
   persist(
      (...a) => ({
         ...createPokemonSlice(...a),
      }),
      {
         name: "pokemon-storage",
      }
   )
);

export default useStore;
