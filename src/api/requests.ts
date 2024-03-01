import { Housing } from "../types";
import { Endpoints } from "./endpoints";
import axios from "axios";

export const client = axios.create({
  baseURL: "/api",
});

export const requests = {
  getHousing: async (): Promise<Housing[]> =>
    client.get(Endpoints.GET_HOUSING).then((res) => res.data),
  getHousingDetail: async (id: string) =>
    client
      .get(Endpoints.GET_HOUSING_DETAIL.replace(":id", id))
      .then((res) => res.data),
};
