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
  const icon = isGrid ? (
    <MdTableRows className="text-lg mr-2" />
  ) : (
    <MdGridView className="text-lg mr-2" />
  );
  const label = isGrid ? "Switch to table view" : "Switch to grid view";

  return (
    <button
      onClick={handleViewChange}
      className="flex items-center gap-1 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 shadow"
      aria-label={label}
      title={label}
    >
      {icon}
      {nextView.charAt(0).toUpperCase() + nextView.slice(1)} view
    </button>
  );
}
