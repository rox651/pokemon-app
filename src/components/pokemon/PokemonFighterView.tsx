import { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import type { PokemonAdapted } from "@/domain/entities/pokemon";
import { cn } from "@/helpers/common/cn";
import PokemonStats from "@/components/pokemon/PokemonStats";
import { PokemonMoves } from "@/components/pokemon/PokemonMoves";

interface PokemonFighterViewProps {
  pokemon: PokemonAdapted;
  isPlayer?: boolean;
  className?: string;
}

const PokemonFighterView = ({
  pokemon,
  className,
  isPlayer = false,
}: PokemonFighterViewProps) => {
  const [isOpenMoves, setIsOpenMoves] = useState(false)
  const playerName = isPlayer ? "You" : "Computer"

  const Arrow = isOpenMoves ? FaArrowAltCircleDown : FaArrowAltCircleUp

  const onClickMovesButton = () => {
    setIsOpenMoves(state => !state)
  }


  return (
    <div className={cn("w-full flex flex-col items-center px-10 static", className)}>
      <div className="w-full flex flex-col items-center rounded-lg sm:rounded-xl  p-4 sm:p-5">
        <h3 className="relative z-10 text-base sm:text-2xl capitalize mt-3 mb-3 ">
          {pokemon.name}
        </h3>
        <img
          className={cn("w-24 h-24 sm:w-28 sm:h-28 lg:w-40 lg:h-40 object-contain ", isPlayer && "-scale-x-[1]")}
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <p className="uppercase self-start">
          {playerName}
        </p>
        <div className="w-full">
          <PokemonStats pokemon={pokemon} />
        </div>
        {isPlayer && (
          <>
            <button
              className="cursor-pointer group w-10 h-10 bottom-5 fixed z-[60] bg-white rounded-full right-1/2  translate-x-1/2"
              type="button"
              aria-label="See moves"
              onClick={onClickMovesButton}
            >
              <Arrow className="size-full text-[#EC9AFA] group-hover:text-black/50 transition-colors" />
            </button>

            {isOpenMoves ? <div className="w-full max-w-2xl bottom-5 bg-white shadow-lg rounded-lg p-3 border border-gray-300 mt-4 sm:mt-5 lg:mt-6 fixed z-50 right-1/2  translate-x-1/2 ">
              <PokemonMoves setIsOpenMoves={setIsOpenMoves} pokemon={pokemon} />
            </div>
              : null}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonFighterView;
