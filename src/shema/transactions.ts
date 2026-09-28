import * as z from "zod";
import { type Transaction } from "../types/transaction.types";

export const TransactionsSchema = z.object({
  id: z.number(),
  date: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  category: z.string(),
  description: z.string(),
});
