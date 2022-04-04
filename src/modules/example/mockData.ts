import {
  Restaurant,
  RestaurantRating,
  User,
} from "./domain/types";

export const restaurants: Restaurant[] = [
  {
    id: "cafeglouchesterid",
    name: "Cafe Gloucester",
  },
  {
    id: "uglydumplingid",
    name: "The Ugly Dumpling",
  },
  {
    id: "baravignonid",
    name: "Bar Avignon",
  },
  {
    id: "redtunaid",
    name: "Red Tuna",
  },
];

export const restaurantsById: { [p: string]: Restaurant } = restaurants.reduce(
  (o, restaurant) => ({ ...o, [restaurant.id]: restaurant }),
  {},
);

export const users: User[] = [
  {
    id: "user1",
    name: "User 1",
    isTrusted: true,
  },
  {
    id: "user2",
    name: "User 2",
    isTrusted: false,
  },
  {
    id: "user3",
    name: "User 3",
    isTrusted: false,
  },
];

export const ratings: RestaurantRating[] = [
  {
    ratedByUser: users[0],
    rating: "EXCELLENT",
    restaurantId: restaurants[0].id,
  },
  {
    ratedByUser: users[1],
    rating: "TERRIBLE",
    restaurantId: restaurants[0].id,
  },
  {
    ratedByUser: users[2],
    rating: "AVERAGE",
    restaurantId: restaurants[0].id,
  },
  {
    ratedByUser: users[2],
    rating: "ABOVE_AVERAGE",
    restaurantId: restaurants[3].id,
  },
];
