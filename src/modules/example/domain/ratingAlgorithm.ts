import { rating, RestaurantRating } from "./types";

const trustedUserMultiplier = (rating: RestaurantRating) =>
  rating.ratedByUser.isTrusted ? 4 : 1;

export const calculateRating = (r: RestaurantRating[]): number => {
  const weighted: [RestaurantRating, number][] = r.map(rating => [
    rating,
    trustedUserMultiplier(rating),
  ]);
  const totals = weighted.reduce(
    (acc, next) => {
      const multiplier = next[1];
      const rated = rating[next[0].rating] * multiplier;
      return [acc[0] + rated, acc[1] + multiplier];
    },
    [0, 0],
  );
  return totals[0] / totals[1];
};
