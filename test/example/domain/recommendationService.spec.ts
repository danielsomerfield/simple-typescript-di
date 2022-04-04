import { getRecommendedRestaurants } from "../../../src/modules/example/domain/recommendationService";
import {
  Restaurant,
  RestaurantRating,
} from "../../../src/modules/example/domain/types";
import { MockedFunction } from "ts-jest";
import {
  ratings,
  restaurants,
  restaurantsById,
  users,
} from "../../../src/modules/example/mockData";
import { calculateRating } from "../../../src/modules/example/domain/ratingAlgorithm";

describe("The recommendation service", () => {
  it("Gets recommendations for me", async () => {
    const findAllRatings: MockedFunction<() => Promise<RestaurantRating[]>> =
      jest.fn();

    const getRestaurantById: MockedFunction<
      (id: string) => Promise<Restaurant | undefined>
    > = jest.fn();

    const trustedUser = users[0];
    const untrustedUser1 = users[1];
    const untrustedUser2 = users[2];
    const ratings: RestaurantRating[] = [
      {
        ratedByUser: trustedUser,
        rating: "EXCELLENT",
        restaurantId: restaurants[0].id,
      },
      {
        ratedByUser: untrustedUser1,
        rating: "TERRIBLE",
        restaurantId: restaurants[0].id,
      },
      {
        ratedByUser: untrustedUser2,
        rating: "ABOVE_AVERAGE",
        restaurantId: restaurants[3].id,
      },
    ];
    findAllRatings.mockResolvedValueOnce(ratings);

    getRestaurantById.mockImplementation((id: string) =>
      Promise.resolve(restaurantsById[id]),
    );

    const recommended = await getRecommendedRestaurants({
      findAllRatings,
      getRestaurantById,
      calculateRestaurantRatings: calculateRating,
    })();

    expect(recommended.length).toEqual(2);
    expect(recommended.map(r => r.name)).toEqual([
      restaurants[3].name,
      restaurants[0].name,
    ]);
  });
});
