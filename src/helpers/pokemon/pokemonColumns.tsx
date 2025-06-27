import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { getBaseStat } from "./getBaseState";

import type { PokemonAdapted } from "@/domain/entities/pokemon";

const columnHelper = createColumnHelper<PokemonAdapted>();

export const pokemonColumns = (onSelect: (pokemon: PokemonAdapted) => void) =>
  [
    columnHelper.display({
      id: "image",
      header: "Imagen",
      cell: ({ row }) => (
        <div className="text-center">
          <img
            src={row.original.sprites.front_default}
            alt={row.original.name}
            style={{ width: "50px", height: "50px" }}
          />
          <button
            onClick={() => onSelect(row.original)}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Ver
          </button>
        </div>
      ),
      enableSorting: false,
    }),

    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),

    columnHelper.accessor(
      (row) => row.types.map((t) => t.type.name).join(", "),
      {
        id: "types",
        header: "Tipo de Pokemon",
        cell: (info) => info.getValue(),
        enableSorting: true,
        sortingFn: (a, b) => {
          const typeA = a.getValue<string>("types").split(", ")[0] || "";
          const typeB = b.getValue<string>("types").split(", ")[0] || "";
          return typeA.localeCompare(typeB);
        },
      },
    ),

    columnHelper.accessor("weight", {
      header: "Peso (kg)",
      cell: (info) => `${info.getValue()} kg`,
      enableSorting: true,
    }),

    columnHelper.accessor("height", {
      header: "Altura (m)",
      cell: (info) => `${info.getValue()} m`,
      enableSorting: true,
    }),

    columnHelper.accessor((row) => getBaseStat(row, "hp"), {
      id: "hp",
      header: "Salud base",
      enableSorting: true,
    }),

    columnHelper.accessor("base_experience", {
      header: "Experiencia base",
      enableSorting: true,
    }),

    columnHelper.accessor((row) => getBaseStat(row, "attack"), {
      id: "attack",
      header: "Ataque base",
      enableSorting: true,
    }),

    columnHelper.accessor((row) => getBaseStat(row, "defense"), {
      id: "defense",
      header: "Defensa base",
      enableSorting: true,
    }),

    columnHelper.accessor((row) => getBaseStat(row, "special-attack"), {
      id: "specialAttack",
      header: "Ataque especial",
      enableSorting: true,
    }),

    columnHelper.accessor((row) => getBaseStat(row, "special-defense"), {
      id: "specialDefense",
      header: "Defensa especial",
      enableSorting: true,
    }),

    columnHelper.accessor((row) => getBaseStat(row, "speed"), {
      id: "speed",
      header: "Velocidad",
      enableSorting: true,
    }),
  ] as ColumnDef<PokemonAdapted, unknown>[];
