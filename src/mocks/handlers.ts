import { http, delay, HttpResponse } from "msw";
import transactions from "./transactions.json";
import { randomIntFromInterval } from "../utils/helpers";

export const handlers = [
  http.get("/api/transactions", async () => {
    await delay(randomIntFromInterval(300, 800));

    const random = Math.floor(Math.random() * 100);
    return HttpResponse.json(transactions, random < 10 ? { status: 500 } : {});
  }),
];
