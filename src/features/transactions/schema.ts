import * as z from "zod";

export const StatusSchema = z.enum(["SUCCESS", "PENDING", "FAILED"]);
export const CategorySchema = z.enum(["INCOME", "OUTCOME"]);

export const TransactionSchema = z.object({
  id: z.number(),
  date: z.string(),
  amount: z.number(),
  currency: z.enum(["EUR", "USD"]),
  status: StatusSchema,
  category: CategorySchema,
  description: z.string(),
});

export const TransactionsListSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  items: z.array(TransactionSchema),
});

export const TransactionsSearchParamsSchema = z.object({
  page: z.coerce.number().int().gte(1).catch(1),
  status: z.optional(StatusSchema).catch(undefined),
  category: z.optional(CategorySchema).catch(undefined),
  search: z.optional(z.string()),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type TransactionsSearchParams = z.infer<
  typeof TransactionsSearchParamsSchema
>;
