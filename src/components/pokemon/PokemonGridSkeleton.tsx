import PokemonCardSkeleton from "./PokemonCardSkeleton";

const PokemonGridSkeleton = () => {
  const skeletons = Array.from({ length: 24 }, (_, i) => i);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 mt-10 gap-x-4 p-4">
      {skeletons.map((i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </section>
  );
};

export default PokemonGridSkeleton;
