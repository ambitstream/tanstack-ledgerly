import * as z from "zod";

export const TransactionSchema = z.object({
  id: z.number(),
  date: z.string(),
  amount: z.number(),
  currency: z.enum(["EUR", "USD"]),
  status: z.enum(["SUCCESS", "PENDING", "FAILED"]),
  category: z.enum(["INCOME", "OUTCOME"]),
  description: z.string(),
});

export const TransactionsListSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  items: z.array(TransactionSchema),
});

export type Transaction = z.infer<typeof TransactionSchema>;
