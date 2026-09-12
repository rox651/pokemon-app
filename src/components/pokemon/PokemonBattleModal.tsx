import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_BATTLE_DELAY,
  TOTAL_POKEMONS,
} from "@/domain/entities/constant";
import { unlockOrientation } from "@/helpers/common/changeOrientation";
import { generateRandomNumber } from "@/helpers/common/generateRandomNumber";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import { useBattleStatus } from "@/hooks/pokemon/useBattleStatus";
import { useGetPokemonById } from "@/hooks/pokemon/useGetPokemonById";
import useStore from "@/store";
import BattleMessage from "./BattleMessage";
import PokemonFighterView from "./PokemonFighterView";
import PokemonFighterViewSkeleton from "./PokemonFighterViewSkeleton";

const PokemonBattleModal = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [randomId, setRandomId] = useState<number>();

  const pokemonFromPlayer = useStore((state) => state.pokemonFromPlayer);
  const pokemonFromComputer = useStore((state) => state.pokemonFromComputer);
  const setStatus = useStore((state) => state.setStatus);
  const setPokemonFromComputer = useStore(
    (state) => state.setPokemonFromComputer,
  );

  const { data: pokemon } = useGetPokemonById({
    id: randomId,
    enabled: !!randomId,
  });
  const { isPlaying, isWin, isLose, isAttacking } = useBattleStatus();

  const onClose = () => {
    setStatus("idle");
    unlockOrientation();
  };

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => onClose());

  useEffect(() => {
    if (pokemonFromPlayer) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [pokemonFromPlayer]);

  useEffect(() => {
    if (!pokemon) return;
    setPokemonFromComputer(pokemon);

    return () => {
      setPokemonFromComputer(null);
    };
  }, [pokemon]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const generateRandomPokemonId = async () => {
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, DEFAULT_BATTLE_DELAY);
      });

      const randomPokemonId = generateRandomNumber(TOTAL_POKEMONS);
      setRandomId(randomPokemonId);
    };

    generateRandomPokemonId();

    return () => {
      clearTimeout(timeoutId);
      setRandomId(undefined);
    };
  }, [setRandomId]);

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
    <div className="@container fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center ">
      <BattleMessage type={getBattleMessageType()} />
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 @min-[640px]:p-4 @min-[1024px]:p-6 w-full h-screen overflow-y-auto flex flex-col justify-center"
      >
        <div className="flex flex-col items-center mb-2 sm:mb-4 @min-[640px]:mb-3">
          {isWin && (
            <h1 className="text-2xl sm:text-3xl @min-[640px]:text-3xl @min-[1024px]:text-4xl font-bold text-green-500">
              Win
            </h1>
          )}
          {isPlaying && (
            <h1 className="text-2xl sm:text-3xl @min-[640px]:text-4xl @min-[1024px]:text-7xl text-gray-900">
              Battle!
            </h1>
          )}
          {isLose && (
            <h1 className="text-2xl sm:text-3xl @min-[640px]:text-3xl @min-[1024px]:text-4xl text-red-500">
              Lose
            </h1>
          )}
          {isAttacking && (
            <h1 className="text-2xl sm:text-3xl @min-[640px]:text-3xl @min-[1024px]:text-4xl text-gray-900">
              Attacking
            </h1>
          )}
        </div>

        <div className="flex flex-col gap-4 @min-[640px]:grid @min-[640px]:grid-cols-2 @min-[640px]:gap-8 @min-[640px]:items-center @min-[640px]:relative">
          <PokemonFighterView isPlayer pokemon={pokemonFromPlayer} />
          <div className="flex justify-center -my-2 relative z-10 @min-[640px]:pointer-events-none @min-[640px]:absolute @min-[640px]:left-1/2 @min-[640px]:top-1/2 @min-[640px]:-translate-x-1/2 @min-[640px]:-translate-y-1/2 @min-[640px]:m-0">
            <div className="w-14 h-14 @min-[640px]:w-16 @min-[640px]:h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center shadow-lg ring-2 @min-[640px]:ring-4 ring-white">
              <span className="text-white font-extrabold text-base @min-[640px]:text-xl drop-shadow">
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
        <div className="flex justify-center mt-4 sm:mt-6 fixed right-5 bottom-5 z-50">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg bg-[#EC9AFA] hover:bg-gray-300 text-gray-800 font-semibold transition-colors text-sm sm:text-base"
          >
            Escape this battle
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonBattleModal;
