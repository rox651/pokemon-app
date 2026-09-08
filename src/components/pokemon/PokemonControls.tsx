import PokemonButtonViewChange from "./PokemonButtonViewChange";
import PokemonSelectFilter from "./PokemonSelectFilter";

interface PokemonControlsProps {
  currentView: "grid" | "table";
  onViewChange: (view: "grid" | "table") => void;
  onFilterChange: (selectedType: string | null) => void;
  isLoading: boolean
}

export default function PokemonControls({
  currentView,
  onViewChange,
  onFilterChange,
  isLoading
}: PokemonControlsProps) {
  return (
    <div className="flex gap-4 items-center" inert={isLoading}>
      <PokemonButtonViewChange
        currentView={currentView}
        onViewChange={onViewChange}
      />
      <PokemonSelectFilter onFilterChange={onFilterChange} />
    </div>
  );
}
