import { HttpError } from "../../api/httpError";
import { TransactionsListSchema } from "./schema";
import { DEFAULT_PAGE_SIZE } from "../../constants";

export const getTransactions = async ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}) => {
  const response = await fetch(
    `/api/transactions?page=${page}&pageSize=${pageSize}`,
  );

  if (!response.ok) {
    throw new HttpError(response.status, "Response error");
  }

  const rawData = await response.json();

  return TransactionsListSchema.parse(rawData);
};
