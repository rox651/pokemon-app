export default function PokemonPaginationSkeleton() {
  return (
    <div className="flex justify-center gap-2 my-6">
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
    </div>
  );
}
