import type { PokemonAdapted } from "@/domain/entities/pokemon";
import useStore from "@/store";
import { cn } from "@/helpers/common/cn";

interface PokemonCardViewProps {
  pokemon: PokemonAdapted;
  onSelect?: (pokemon: PokemonAdapted) => void;
}

const PokemonCardView = ({ pokemon, onSelect }: PokemonCardViewProps) => {
  const setStatus = useStore((state) => state.setStatus);
  const setPokemonFromPlayer = useStore((state) => state.setPokemonFromPlayer);

  const onClickPlay = () => {
    setStatus("playing");
    setPokemonFromPlayer(pokemon);
  };

  return (
    <button
      onClick={() => {
        onSelect?.(pokemon);
      }}
      className={cn(
        "flex  flex-col items-center pt-20 p-4 rounded-xl bg-[#ECEBE7]  group  relative",
      )}
    >
      <div className={cn("cursor-pointer")}>
        <h3 className="text-white bg-[#0A0A0A] text-sm size-10 grid place-content-center  mb-2 right-5 top-5 absolute rounded-full">
          {pokemon.id}
        </h3>
        <img
          className="size-24 object-contain transition-transform group-hover:-rotate-10 group-hover:scale-180   scale-150  "
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h3 className="relative z-10 text-lg capitalize mb-3 font-black group-hover:rotate-5 transition-all group-hover:-translate-y-1 font-medium  px-3 rounded-xl mt-5">
          {pokemon.name}
        </h3>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClickPlay();
        }}
        className="w-full cursor-pointer bg-[#F4FF69] px-4 py-2 rounded-full text-black  transition-colors duration-300"
      >
        Battle with this Pokemon
      </div>
    </button>
  );
};

export default PokemonCardView;
