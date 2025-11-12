import type { PokemonAdapted } from "@/domain/entities/pokemon";
import { cn } from "@/helpers/common/cn";
import { getPokemonTypeColor } from "@/helpers/pokemon/pokemonTypes";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import { IoClose } from "react-icons/io5";
import PokemonStats from "@/components/pokemon/PokemonStats";
import useStore from "@/store";

interface PokemonModalViewProps {
  pokemon: PokemonAdapted;
  onClose: () => void;
}

const PokemonModalView = ({ pokemon, onClose }: PokemonModalViewProps) => {
  const setStatus = useStore((state) => state.setStatus);
  const setPokemonFromPlayer = useStore((state) => state.setPokemonFromPlayer);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const onClickPlay = () => {
    setStatus("playing");
    setPokemonFromPlayer(pokemon);
    onClose();
  };

  useClickOutside(modalRef as React.RefObject<HTMLElement>, () => onClose());

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-black text-2xl"
          aria-label="Close"
        >
          <IoClose />
        </button>
        <div className="w-full max-w-md mx-auto space-y-4 text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto w-40 h-40 object-contain"
          />
          <p className="text-gray-400 font-semibold text-sm">#{pokemon.id}</p>
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <div className="flex justify-center gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className={cn(
                  "px-4 py-1 text-xs font-bold rounded-lg uppercase text-white shadow",
                )}
                style={{ backgroundColor: getPokemonTypeColor(t.type.name) }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="flex justify-around mt-4 text-sm font-medium text-gray-700">
            <div>
              <div className="text-xs text-gray-500">Height</div>
              <div>{pokemon.height} m</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Weight</div>
              <div>{pokemon.weight} kg</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Base EXP</div>
              <div>{pokemon.base_experience}</div>
            </div>
          </div>

          <PokemonStats pokemon={pokemon} />

          <button
            onClick={onClickPlay}
            className="w-full cursor-pointer bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 transition-colors duration-300"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonModalView;
