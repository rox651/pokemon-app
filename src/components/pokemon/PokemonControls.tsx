import PokemonButtonViewChange from "./PokemonButtonViewChange";
import PokemonSelectFilter from "./PokemonSelectFilter";

interface PokemonControlsProps {
   currentView: "grid" | "table";
   onViewChange: (view: "grid" | "table") => void;
   onFilterChange: (selectedType: string | null) => void;
}

export default function PokemonControls({
   currentView,
   onViewChange,
   onFilterChange,
}: PokemonControlsProps) {
   return (
      <div className="flex gap-4 items-center">
         <PokemonButtonViewChange currentView={currentView} onViewChange={onViewChange} />
         <PokemonSelectFilter onFilterChange={onFilterChange} />
      </div>
   );
}
