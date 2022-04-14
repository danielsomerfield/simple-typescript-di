import { Express } from "express";
import * as handlers from "./handlers";
import { createRecommendedRestaurantsFinder } from "./domain/recommendationService";
import { ratingsRepository } from "./repositories/ratingsRepository";
import { restaurantRepository } from "./repositories/restaurantRepository";
import { calculateRating } from "./domain/ratingAlgorithm";

/**
 * Everything gets wired together here.
 * This is the equivalent of Spring's modules with @Inject or Dagger's factories
 * but without the runtime binding or annotation processing.
 */
const init = async (app: Express) => {
  const ratingsRepo = ratingsRepository({});
  const restaurantRepo = restaurantRepository({});

  /**
   * Dependencies are bound at the function level, rather than at the type level
   * so developers have to make a conscious decision when adding a new dependency rather than just
   * using it "because it's there".
   */
  const recommendedRestaurantsFinder = createRecommendedRestaurantsFinder({
    findAllRatings: ratingsRepo.findAllRatings,
    getRestaurantById: restaurantRepo.getRestaurantById,
    calculateOverallRating: calculateRating,
  });

  app.get(
    "/restaurants/recommended",
    handlers.createRecommendationsHandler({
      getRecommendedRestaurants: recommendedRestaurantsFinder,
    }),
  );
};

const shutdown = async () => {
  // Cleanup whatever needs it
};

export const exampleDIModule = {
  init,
  shutdown,
};
