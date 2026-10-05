import { HttpError } from "../../api/httpError";
import { TransactionsListSchema } from "./schema";
import type { TransactionsSearchParams } from "./schema";

export const getTransactions = async (paramsObj: TransactionsSearchParams) => {
  const params = new URLSearchParams();

  for (const item of Object.entries(paramsObj)) {
    if (item[1] !== undefined) {
      params.set(item[0], item[1].toString());
    }
  }

  const response = await fetch(`/api/transactions?${params.toString()}`);

  if (!response.ok) {
    throw new HttpError(response.status, "Response error");
  }

  const rawData = await response.json();

  return TransactionsListSchema.parse(rawData);
};
