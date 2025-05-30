import type { Medal } from '../types/Medal';

export function sortMedals(data: Medal[], sortBy: string): Medal[] {
  const sortFn = {
    total: (a: Medal, b: Medal) =>
      b.gold + b.silver + b.bronze - (a.gold + a.silver + a.bronze) ||
      b.gold - a.gold,
    gold: (a: Medal, b: Medal) => b.gold - a.gold || b.silver - a.silver,
    silver: (a: Medal, b: Medal) => b.silver - a.silver || b.gold - a.gold,
    bronze: (a: Medal, b: Medal) => b.bronze - a.bronze || b.gold - a.gold,
  }[sortBy];

  return [...data].sort(sortFn ?? sortFn["gold"]);
}
