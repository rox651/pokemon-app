import { DEFAULT_BATTLE_DELAY, MAX_MOVES } from "@/domain/entities/constant";
import type { Move, PokemonAdapted, PokemonMove } from "@/domain/entities/pokemon";
import { generateRandomNumber } from "@/helpers/common/generateRandomNumber";
import calculateDamage from "@/helpers/pokemon/calculateDamage";
import { getPokemonStatsWithDamageApplied } from "@/helpers/pokemon/getPokemonStatsWithDamageApplied";
import type { StateCreator } from "zustand";

type PlayStatus = "idle" | "playing" | "win" | "lose" | "attacking";

export interface PokemonSlice {
   status: PlayStatus;
   pokemonFromPlayer: PokemonAdapted | null;
   pokemonFromComputer: PokemonAdapted | null;
   playerMaxHp: number | null;
   computerMaxHp: number | null;
   setStatus: (status: PlayStatus) => void;
   setPokemonFromPlayer: (pokemon: PokemonAdapted | null) => void;
   setPokemonFromComputer: (pokemon: PokemonAdapted | null) => void;
   selectedPokemonForModal: PokemonAdapted | null;
   setSelectedPokemonForModal: (pokemon: PokemonAdapted | null) => void;
   attack: (move: PokemonMove) => Promise<void>;
}

export const createPokemonSlice: StateCreator<PokemonSlice, [], [], PokemonSlice> = (set, get) => ({
   status: "idle",
   pokemonFromPlayer: null,
   pokemonFromComputer: null,
   setStatus: status => set({ status }),
   setPokemonFromPlayer: pokemon => set({ pokemonFromPlayer: pokemon }),
   setPokemonFromComputer: pokemon => set({ pokemonFromComputer: pokemon }),
   selectedPokemonForModal: null,
   setSelectedPokemonForModal: pokemon => set({ selectedPokemonForModal: pokemon }),
   attack: async move => {
      const { pokemonFromPlayer, pokemonFromComputer } = get();

      if (!pokemonFromPlayer || !pokemonFromComputer) {
         return;
      }

      // Player 1 attack

      const { damage: damageFromPlayer } = await calculateDamage(
         pokemonFromPlayer,
         pokemonFromComputer,
         move
      );

      const { stats: pokemonFromComputerNewStats, hp: pokemonFromComputerHp } =
         getPokemonStatsWithDamageApplied(pokemonFromComputer, damageFromPlayer);

      const isPlayerWin = pokemonFromComputerHp <= 0;

      set({
         status: isPlayerWin ? "win" : "attacking",
         pokemonFromComputer: {
            ...pokemonFromComputer,
            stats: pokemonFromComputerNewStats,
         },
      });

      if (isPlayerWin) {
         return;
      }

      // Player 2 attack

      const randomMove = pokemonFromComputer.moves[generateRandomNumber(MAX_MOVES)];

      const { damage: damageFromComputer } = await calculateDamage(
         pokemonFromComputer,
         pokemonFromPlayer,
         randomMove
      );

      const { stats: pokemonFromPlayerNewStats, hp: pokemonFromPlayerHp } =
         getPokemonStatsWithDamageApplied(pokemonFromPlayer, damageFromComputer);

      await new Promise(resolve => {
         setTimeout(resolve, DEFAULT_BATTLE_DELAY);
      });

      const isComputerWin = pokemonFromPlayerHp <= 0;

      set({
         status: isComputerWin ? "lose" : "playing",
         pokemonFromPlayer: {
            ...pokemonFromPlayer,
            stats: pokemonFromPlayerNewStats,
         },
         pokemonFromComputer: {
            ...pokemonFromComputer,
            stats: pokemonFromComputerNewStats,
         },
      });
   },
});
