import axios from "axios";
import { start, stop } from "../src";
import { Server } from "http";
import { restaurants } from "../src/modules/example/mockData";

describe("the restaurants endpoint", () => {
  let app: Server;

  beforeEach(async () => {
    app = await start();
  });

  afterEach(async () => {
    if (app) {
      await stop();
    }
  });

  it("ranks by the recommendation heuristic", async () => {
    const response = await axios.get<ResponsePayload>(
      "http://localhost:3000/restaurants/recommended",
    );
    expect(response.status).toEqual(200);
    const data = response.data;
    const returnRestaurants = data.restaurants.map(r => r.id);
    expect(returnRestaurants).toEqual([restaurants[0].id, restaurants[3].id]);
  });
});

type ResponsePayload = {
  restaurants: { id: string; name: string }[];
};
