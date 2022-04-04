import { ratings } from "../mockData";
import { RestaurantRating } from "../domain/types";

export interface RatingsRepositoryDependencies {
  // This could have additional dependencies like configuration
  //  or database connection pools.
}

/**
 * Mocked implementation of finder
 */
const findAllRatings = async () => {
  // query the database
  return ratings;
};

const insertRating = async (rating: RestaurantRating) => {
  // Do the insert
};

/**
 * In this example, we choose to expose an entire repository type.
 */
export const ratingsRepository = (
  dependencies: RatingsRepositoryDependencies,
) => {
  return {
    findAllRatings,
    insertRating,
  };
};
