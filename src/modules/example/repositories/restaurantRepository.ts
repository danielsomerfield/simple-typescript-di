import { restaurantsById } from "../mockData";

export interface RestaurantRepositoryDependencies {
  // This could have additional dependencies like configuration
  //  or database connection pools.
}

const getRestaurantById = async (id: string) => {
  return restaurantsById[id];
};

export const restaurantRepository = (
  dependencies: RestaurantRepositoryDependencies,
) => {
  return {
    getRestaurantById,
  };
};
