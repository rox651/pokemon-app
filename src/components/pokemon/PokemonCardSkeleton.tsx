const PokemonCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center pt-20 p-4 border border-gray-300/30 rounded-xl shadow relative animate-pulse">
      <div className="absolute top-5 right-5 w-12 h-6 bg-gray-300 rounded" />
      <div className="absolute -top-10 w-24 h-24 bg-gray-300 rounded-full" />
      <div className="relative z-10 mt-8 h-6 w-24 bg-gray-300 rounded-xl" />
    </div>
  );
};

export default PokemonCardSkeleton;
