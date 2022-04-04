import { Request, Response } from "express";
import { Restaurant } from "./domain/types";

export interface RecommendationsHandlerDependencies {
  getRecommendedRestaurants: () => Promise<Restaurant[]>;
}

export const recommendationsHandler = (
  dependencies: RecommendationsHandlerDependencies,
) => {
  const { getRecommendedRestaurants } = dependencies;
  return async (request: Request, response: Response) => {
    const restaurants = await getRecommendedRestaurants();
    response.status(200).send({
      restaurants,
    });
  };
};
