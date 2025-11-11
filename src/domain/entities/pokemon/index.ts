import type { PokemonType } from "./pokemonTypes";

export interface PokemonStat {
   hp: number;
   attack: number;
   defense: number;
   "special-attack": number;
   "special-defense": number;
   speed: number;
}

export type PokemonStatType = keyof PokemonStat;

export type Metadata<T = string> = {
   name: T;
   url: string;
};

export type PokemonMetadata = Metadata;

export interface PokemonMove {
   move: Metadata;
}

export interface Pokemon {
   abilities: Ability[];
   base_experience: number;
   height: number;
   id: number;
   name: string;
   order: number;
   species: Metadata;
   sprites: Sprites;
   stats: Stat[];
   types: Type[];
   weight: number;
   moves: PokemonMove[];
}

export interface PokemonAdapted extends Pokemon {
   total_stat: number;
}

export interface Ability {
   ability: Metadata | null;
   is_hidden: boolean;
   slot: number;
}

export interface Sprites {
   front_default: string;
}

export interface Stat {
   base_stat: number;
   effort: number;
   stat: Metadata<PokemonStatType>;
}

export interface Type {
   slot: number;
   type: Metadata<PokemonType>;
}

export type DamageCategory = "physical" | "special" | "status";

export interface Move {
   id: number;
   name: string;
   power: number | null;
   type: PokemonType;
   damage_class: Metadata<DamageCategory>;
   accuracy?: number | null;
   pp?: number | null;
}

export interface DamageRelations {
   double_damage_from: Metadata<PokemonType>[];
   double_damage_to: Metadata<PokemonType>[];
   half_damage_from: Metadata<PokemonType>[];
   half_damage_to: Metadata<PokemonType>[];
   no_damage_from: Metadata<PokemonType>[];
   no_damage_to: Metadata<PokemonType>[];
}

export interface PokemonTypeInfo {
   id: number;
   name: PokemonType;
   damage_relations: DamageRelations;
}
