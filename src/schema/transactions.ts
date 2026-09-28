import * as z from "zod";

export const TransactionSchema = z.object({
  id: z.number(),
  date: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  category: z.string(),
  description: z.string(),
});

export const TransactionsSchema = z.array(TransactionSchema);

export type Transaction = z.infer<typeof TransactionSchema>;
export type Transactions = z.infer<typeof TransactionsSchema>;
