const PokemonTableSkeleton = () => {
  const placeholderRows = Array.from({ length: 24 });
  const placeholderCols = 14;
  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      <div className="grid grid-cols-14 bg-gray-100 text-left font-semibold text-sm text-gray-600">
        {Array.from({ length: placeholderCols }).map((_, i) => (
          <div key={i} className="py-3 px-4">
            <div className="h-4 bg-gray-300 rounded w-full mb-5 animate-pulse" />
          </div>
        ))}
      </div>
      <div>
        {placeholderRows.map((_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-14 border-t border-gray-200 animate-pulse"
          >
            {Array.from({ length: placeholderCols }).map((_, colIdx) => (
              <div key={colIdx} className="py-3 px-4">
                <div className="h-4 mb-10 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonTableSkeleton;
