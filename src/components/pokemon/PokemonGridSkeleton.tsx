import { PAGE_SIZE } from "@/domain/entities/constant";

import PokemonCardSkeleton from "./PokemonCardSkeleton";

const PokemonGridSkeleton = () => {
  const skeletons = Array.from({ length: PAGE_SIZE }, (_, i) => i);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-4 p-4 mt-20">
      {skeletons.map((i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </section>
  );
};

export default PokemonGridSkeleton;
