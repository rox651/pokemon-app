import { useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import useStore from "@/store";
import PokemonFighterView from "./PokemonFighterView";
import { useGetAllPokemons } from "@/hooks/pokemon/useGetAllPokemons";
import PokemonFighterViewSkeleton from "./PokemonFighterViewSkeleton";
import { generateRandomNumber } from "@/helpers/common/generateRandomNumber";
import { DEFAULT_BATTLE_DELAY } from "@/domain/entities/constant";
import { useBattleStatus } from "@/hooks/pokemon/useBattleStatus";
import BattleMessage from "./BattleMessage";

const PokemonBattleModal = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { data: pokemons } = useGetAllPokemons();

  const pokemonFromPlayer = useStore((state) => state.pokemonFromPlayer);
  const pokemonFromComputer = useStore((state) => state.pokemonFromComputer);
  const setStatus = useStore((state) => state.setStatus);
  const setPokemonFromComputer = useStore(
    (state) => state.setPokemonFromComputer,
  );

  const { isPlaying, isWin, isLose, isAttacking } = useBattleStatus();

  const onClose = () => {
    setStatus("idle");
  };

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => onClose());

  useEffect(() => {
    if (pokemonFromPlayer) {
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [pokemonFromPlayer]);

  useEffect(() => {
    if (!pokemons || pokemons.length === 0) return;
    let timeoutId: NodeJS.Timeout;

    const generateRandomPokemon = async () => {
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, DEFAULT_BATTLE_DELAY);
      });

      const randomPokemon = pokemons[generateRandomNumber(pokemons.length)];
      setPokemonFromComputer(randomPokemon);
    };

    generateRandomPokemon();

    return () => {
      clearTimeout(timeoutId);
      setPokemonFromComputer(null);
    };
  }, [setPokemonFromComputer, pokemons]);

  if (!pokemonFromPlayer) {
    return null;
  }

  const getBattleMessageType = () => {
    if (isAttacking) return "attacking";
    if (isWin) return "win";
    if (isLose) return "lose";
    return null;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6"
    >
      <BattleMessage type={getBattleMessageType()} />
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 w-full max-w-5xl max-h-[98vh] sm:max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          {isWin && <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500">Win</h1>}
          {isPlaying && (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Battle</h1>
          )}
          {isLose && <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500">Lose</h1>}
          {isAttacking && (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Attacking</h1>
          )}
        </div>

        {/* Desktop Layout: Side by side with VS in center */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start lg:relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center shadow-lg ring-4 ring-white">
              <span className="text-white font-extrabold text-xl drop-shadow">
                VS
              </span>
            </div>
          </div>
          <PokemonFighterView isPlayer pokemon={pokemonFromPlayer} />
          {pokemonFromComputer ? (
            <PokemonFighterView pokemon={pokemonFromComputer} />
          ) : (
            <PokemonFighterViewSkeleton />
          )}
        </div>

        {/* Mobile Layout: Stacked vertically with VS between */}
        <div className="lg:hidden flex flex-col gap-4">
          <PokemonFighterView isPlayer pokemon={pokemonFromPlayer} />
          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center shadow-lg ring-2 ring-white">
              <span className="text-white font-extrabold text-base drop-shadow">
                VS
              </span>
            </div>
          </div>
          {pokemonFromComputer ? (
            <PokemonFighterView pokemon={pokemonFromComputer} />
          ) : (
            <PokemonFighterViewSkeleton />
          )}
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonBattleModal;
