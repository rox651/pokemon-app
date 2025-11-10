export default function PokemonControlsSkeleton() {
  return (
    <div className="flex gap-4 items-center my-6">
      <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      <div className="h-10 w-44 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}
