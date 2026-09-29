import { HttpError } from "../../api/httpError";
import { TransactionsSchema } from "./schema";

export const getTransactions = async () => {
  const response = await fetch("/api/transactions");

  if (!response.ok) {
    throw new HttpError(response.status, "Response error");
  }

  const rawData = await response.json();
  return TransactionsSchema.parse(rawData);
};
