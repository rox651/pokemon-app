import type { PokemonAdapted, PokemonMove } from "@/domain/entities/pokemon";
import type { PokemonType } from "@/domain/entities/pokemon/pokemonTypes";
import {
  BASE_DAMAGE_BONUS,
  BASE_DAMAGE_DIVISOR,
  BASE_LEVEL_DIVISOR,
  DEFAULT_LEVEL,
  MAX_RANDOM_FACTOR,
  MIN_RANDOM_FACTOR,
  NO_STAB_BONUS,
  STAB_BONUS,
  EFFECTIVENESS_NORMAL_VALUE,
} from "@/domain/entities/constant.ts";
import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

async function getTypeEffectiveness(
  moveType: PokemonType,
  defenderTypes: PokemonType[],
): Promise<number> {
  if (defenderTypes.length === 0) {
    return EFFECTIVENESS_NORMAL_VALUE;
  }

  const moveTypeInfo = await repository.fetchPokemonTypes(moveType);
  const { damage_relations } = moveTypeInfo;

  let effectiveness = EFFECTIVENESS_NORMAL_VALUE;

  for (const defenderType of defenderTypes) {
    if (
      damage_relations.no_damage_to.some((type) => type.name === defenderType)
    ) {
      return 0;
    }

    if (
      damage_relations.double_damage_to.some(
        (type) => type.name === defenderType,
      )
    ) {
      effectiveness *= 2;
    } else if (
      damage_relations.half_damage_to.some((type) => type.name === defenderType)
    ) {
      effectiveness *= 0.5;
    }
  }

  return effectiveness;
}

export default async function calculateDamage(
  attacker: PokemonAdapted,
  defender: PokemonAdapted,
  pokemonMove: PokemonMove,
  level: number = DEFAULT_LEVEL,
) {
  const normalAttack =
    attacker.stats.find((stat) => stat.stat.name === "attack")?.base_stat ?? 0;
  const specialAttack =
    attacker.stats.find((stat) => stat.stat.name === "special-attack")
      ?.base_stat ?? 0;

  const defenderDefense =
    defender.stats.find((stat) => stat.stat.name === "defense")?.base_stat ?? 0;
  const defenderSpecialDefense =
    defender.stats.find((stat) => stat.stat.name === "special-defense")
      ?.base_stat ?? 0;

  const move = await repository.fetchPokemonMoveByName(pokemonMove.move.name);

  const attackStat =
    move.damage_class.name === "physical" ? normalAttack : specialAttack;

  const defenseStat =
    move.damage_class.name === "physical"
      ? defenderDefense
      : defenderSpecialDefense;

  const movePower = move.power ?? 0;
  const stab = attacker.types.map((type) => type.type.name).includes(move.type)
    ? STAB_BONUS
    : NO_STAB_BONUS;

  const defenderTypes = defender.types.map((type) => type.type.name);
  const effectiveness = await getTypeEffectiveness(move.type, defenderTypes);

  const randomFactor =
    Math.random() * (MAX_RANDOM_FACTOR - MIN_RANDOM_FACTOR) + MIN_RANDOM_FACTOR;

  const baseDamage =
    (((2 * level) / BASE_LEVEL_DIVISOR + BASE_DAMAGE_BONUS) *
      movePower *
      (attackStat / defenseStat)) /
      BASE_DAMAGE_DIVISOR +
    BASE_DAMAGE_BONUS;

  const totalDamage = baseDamage * stab * effectiveness * randomFactor;

  return {
    move: move.name,
    damage: Math.abs(Math.round(totalDamage)),
  };
}
