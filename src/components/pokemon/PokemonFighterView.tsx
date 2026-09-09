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
  const playerName = isPlayer ? "You" : "Computer"
  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      <div className="w-full flex flex-col items-center bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 p-4 sm:p-5">
        <h3 className="relative z-10 text-base sm:text-2xl capitalize mt-3 mb-3 ">
          {pokemon.name}
        </h3>
        <img
          className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"
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
          <div className="w-full mt-4 sm:mt-5 lg:mt-6">
            <PokemonMoves pokemon={pokemon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonFighterView;
