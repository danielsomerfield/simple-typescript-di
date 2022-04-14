import { Restaurant, RestaurantRating } from "./types";

export interface Dependencies {
  findAllRatings: () => Promise<RestaurantRating[]>;
  getRestaurantById: (id: string) => Promise<Restaurant | undefined>;
  calculateOverallRating: (ratings: RestaurantRating[]) => number;
}

export const createRecommendedRestaurantsFinder =
  (dependencies: Dependencies): (() => Promise<Restaurant[]>) =>
  async () => {
    const { getRestaurantById, findAllRatings, calculateOverallRating } =
      dependencies;
    const ratings: RestaurantRating[] = await findAllRatings();
    const restaurantIdToRatings: [string, RestaurantRating[]][] =
      await mapToRestaurants(ratings);
    const restaurantIdToAggregateRating: [string, number][] =
      restaurantIdToRatings.map(r => [r[0], calculateOverallRating(r[1])]);
    const sorted = restaurantIdToAggregateRating.sort(
      (r1, r2) => r1[1] - r2[1],
    );
    return (await Promise.all(
      sorted
        .map(r => getRestaurantById(r[0]))
        .filter(r => r !== undefined),
    )) as Restaurant[];

    async function mapToRestaurants(ratings: RestaurantRating[]) {
      const restaurantToRating = new Map<string, RestaurantRating[]>();
      for (const r of ratings) {
        const existingRestaurant = restaurantToRating.get(r.restaurantId);
        if (existingRestaurant) {
          existingRestaurant.push(r);
        } else {
          restaurantToRating.set(r.restaurantId, [r]);
        }
      }
      return Array.from(restaurantToRating);
    }
  };
