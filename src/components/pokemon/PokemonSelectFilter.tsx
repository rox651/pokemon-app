import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { getPokemonTypeOptions } from "@/helpers/pokemon/pokemonTypes";

interface PokemonSelectFilterProps {
  onFilterChange: (selectedType: string | null) => void;
}

export default function PokemonSelectFilter({
  onFilterChange,
}: PokemonSelectFilterProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const options = getPokemonTypeOptions();

  const handleTypeChange = (value: string) => {
    const newType = value === "all" ? null : value;
    setSelectedType(newType);
    onFilterChange(newType);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[#7C7AF4]">Choose your type</span>
      <Select onValueChange={handleTypeChange} value={selectedType || "all"}>
        <SelectTrigger className="w-[108px] bg-[#0A0A0A] text-white text-center rounded-full cursor-pointer">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent className="bg-[#0A0A0A] text-white">
          <SelectItem value="all">All Types</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
