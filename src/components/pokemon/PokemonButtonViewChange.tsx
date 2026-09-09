import { MdGridView, MdTableRows } from "react-icons/md";

interface PokemonButtonViewChangeProps {
  currentView: "grid" | "table";
  onViewChange: (view: "grid" | "table") => void;
}

export default function PokemonButtonViewChange({
  currentView,
  onViewChange,
}: PokemonButtonViewChangeProps) {
  const handleViewChange = () => {
    const newView = currentView === "grid" ? "table" : "grid";
    onViewChange(newView);
  };

  const isGrid = currentView === "grid";
  const nextView = isGrid ? "table" : "grid";
  const icon = isGrid ? <MdTableRows /> : <MdGridView />;

  const label = isGrid ? "Switch to table view" : "Switch to grid view";

  return (
    <button
      onClick={handleViewChange}
      className="text-white [&>svg]:text-[#F4FF69] flex gap-x-2 items-center cursor-pointer"
      aria-label={label}
      title={label}
    >
      {icon}
      {nextView.charAt(0).toUpperCase() + nextView.slice(1)} view
    </button>
  );
}
