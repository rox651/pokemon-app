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

export default function PokemonSelectFilter({ onFilterChange }: PokemonSelectFilterProps) {
   const [selectedType, setSelectedType] = useState<string | null>(null);
   const options = getPokemonTypeOptions();

   const handleTypeChange = (value: string) => {
      const newType = value === "all" ? null : value;
      setSelectedType(newType);
      onFilterChange(newType);
   };

   return (
      <Select onValueChange={handleTypeChange} value={selectedType || "all"}>
         <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
         </SelectTrigger>
         <SelectContent className="bg-white">
            <SelectItem value="all">All Types</SelectItem>
            {options.map(option => (
               <SelectItem key={option.value} value={option.value}>
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}
