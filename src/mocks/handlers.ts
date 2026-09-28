import { http, delay, HttpResponse } from "msw";
import transactions from "./transactions.json";

export const handlers = [
  http.all("*", async () => {
    await delay(1000);
  }),
  http.get("/api/transactions", () => {
    const random = Math.floor(Math.random() * 100);
    return HttpResponse.json(transactions, random <= 10 ? { status: 500 } : {});
  }),
];
