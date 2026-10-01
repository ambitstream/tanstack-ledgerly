import { http, delay, HttpResponse } from "msw";
import transactions from "./transactions.json";
import { randomIntFromInterval } from "./helpers";
import { DEFAULT_PAGE_SIZE } from "../constants";

export const handlers = [
  http.get("/api/transactions", async ({ request }) => {
    await delay(randomIntFromInterval(300, 800));

    const params = new URL(request.url).searchParams;

    const page = Number(params.get("page")) || 1;
    const pageSize = Number(params.get("pageSize")) || DEFAULT_PAGE_SIZE;
    const total = transactions.length;

    const from = pageSize * (page - 1);
    const to = from + pageSize;
    const items = transactions.slice(from, to);

    const random = Math.floor(Math.random() * 100);

    return HttpResponse.json(
      { items, page, pageSize, total },
      random < 10 ? { status: 500 } : {},
    );
  }),
];
