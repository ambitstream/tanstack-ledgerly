import { shouldRetry } from "../../api/shouldRetry";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";
import type { TransactionsSearchParams } from "./schema";
import { getTransactions } from "./api";

export const transactionKeys = {
  all: ["transactions"] as const,
  lists: () => [...transactionKeys.all, "list"] as const,
  list: (params: TransactionsSearchParams) =>
    [...transactionKeys.lists(), params] as const,
  details: () => [...transactionKeys.all, "detail"] as const,
  detail: (id: number) => [...transactionKeys.details(), id] as const,
};

export const transactionListQueryOptions = (
  params: TransactionsSearchParams,
) => {
  return queryOptions({
    queryKey: transactionKeys.list(params),
    queryFn: () => getTransactions(params),
    retry: shouldRetry,
    placeholderData: keepPreviousData,
  });
};
