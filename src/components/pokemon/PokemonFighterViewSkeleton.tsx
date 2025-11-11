import { cn } from "@/helpers/common/cn";

interface PokemonFighterViewSkeletonProps {
  isPlayer?: boolean;
  className?: string;
}

const PokemonFighterViewSkeleton = ({
  className,
  isPlayer = false,
}: PokemonFighterViewSkeletonProps) => {
  return (
    <div className={cn("w-full flex flex-col items-center p-4", className)}>
      <div className="h-7 w-20 bg-gray-300 rounded-full mb-3 animate-pulse" />
      <div className="w-full flex flex-col items-center bg-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="w-24 h-24 bg-gray-300 rounded-full animate-pulse" />
        <div className="h-6 w-32 bg-gray-300 rounded-xl mt-2 mb-2 animate-pulse" />
        <div className="w-full mt-4 space-y-1">
          <div className="h-4 w-12 bg-gray-300 rounded mb-2 animate-pulse" />
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
                    <div className="h-3 w-8 bg-gray-300 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-6 bg-gray-300 rounded animate-pulse" />
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full animate-pulse" />
              </div>
            ))}
            <div className="h-6 bg-gray-300 rounded-md col-span-3 animate-pulse" />
          </div>
        </div>

        {isPlayer && (
          <div className="w-full mt-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-6 bg-gray-300 rounded-full animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, statIndex) => (
                      <div key={statIndex} className="space-y-1">
                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-full bg-gray-300 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonFighterViewSkeleton;
