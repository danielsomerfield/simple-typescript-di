import { Restaurant, RestaurantRating } from "./types";

/**
 * By defining al the functions it depends on, the module has minimal concrete dependencies.
 * Because typescript has structural typing, we could eliminate all external dependencies, but
 * that seems like a bridge too far.
 */
export interface RecommendationServiceDependencies {
  findAllRatings: () => Promise<RestaurantRating[]>;
  getRestaurantById: (id: string) => Promise<Restaurant | undefined>;
  calculateRestaurantRatings: (ratings: RestaurantRating[]) => number;
}

/**
 * Curried function serves as a factory for plugging in dependencies.
 * This allows for easy testing and the ability to keep functions narrow.
 */
export const getRecommendedRestaurants = (
  dependencies: RecommendationServiceDependencies,
) => {
  const { getRestaurantById, findAllRatings, calculateRestaurantRatings } =
    dependencies;

  const mapToRestaurants = async (ratings: RestaurantRating[]) => {
    const restaurantToRating = new Map<
      string,
      [Restaurant, RestaurantRating[]]
    >();
    for (const r of ratings) {
      const restaurant = await getRestaurantById(r.restaurantId);
      if (restaurant) {
        const existingRestaurant = restaurantToRating.get(r.restaurantId);
        if (existingRestaurant) {
          existingRestaurant[1].push(r);
        } else {
          restaurantToRating.set(r.restaurantId, [restaurant, [r]]);
        }
      }
    }
    return Array.from(restaurantToRating);
  };

  const compareRatings = (r1: RestaurantRating[], r2: RestaurantRating[]) => {
    return calculateRestaurantRatings(r1) - calculateRestaurantRatings(r2);
  };

  return async (): Promise<Restaurant[]> => {
    const ratings: RestaurantRating[] = await findAllRatings();
    const restaurantToRating = await mapToRestaurants(ratings);
    const sorted = restaurantToRating.sort((r1, r2) =>
      compareRatings(r1[1][1], r2[1][1]),
    );
    return sorted.map(r => r[1][0]);
  };
};
