import { http, delay, HttpResponse } from "msw";
import transactions from "./transactions.json";
import { randomIntFromInterval } from "./helpers";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { TransactionsSearchParamsSchema } from "../features/transactions/schema";

export const handlers = [
  http.get("/api/transactions", async ({ request }) => {
    await delay(randomIntFromInterval(300, 800));

    const searchParams = new URL(request.url).searchParams;

    const params = TransactionsSearchParamsSchema.parse(
      Object.fromEntries(searchParams),
    );

    const { status, category, page } = params;

    const filteredTransactions = transactions.filter((item) => {
      return (
        (!status || item.status === status) &&
        (!category || item.category === category)
      );
    });

    const pageSize = DEFAULT_PAGE_SIZE;
    const total = filteredTransactions.length;

    const from = pageSize * (page - 1);
    const to = from + pageSize;
    const items = filteredTransactions.slice(from, to);

    const random = Math.floor(Math.random() * 100);

    return HttpResponse.json(
      { items, page, pageSize, total },
      random < 10 ? { status: 500 } : {},
    );
  }),
];
