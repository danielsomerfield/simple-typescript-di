import { Request, Response } from "express";
import { Restaurant } from "./domain/types";

export interface Dependencies {
  getRecommendedRestaurants: () => Promise<Restaurant[]>;
}

export const createRecommendationsHandler = (
  dependencies: Dependencies,
): ((request: Request, response: Response) => void) => {
  const { getRecommendedRestaurants } = dependencies;
  return async (request: Request, response: Response) => {
    const restaurants = await getRecommendedRestaurants();
    response.status(200).send({
      restaurants,
    });
  };
};
