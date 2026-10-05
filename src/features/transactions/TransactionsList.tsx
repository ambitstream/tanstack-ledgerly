import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getTransactions } from "./api";
import { shouldRetry } from "../../api/shouldRetry";
import { Header, Pagination } from "../../components";
import { TransactionItem } from "./TransactionItem";
import { TransactionsFilter } from "./TransactionsFilter";

import { TransactionsSearchParamsSchema } from "./schema";

export function TransactionsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));

  const onPageChange = (_page: number) => {
    setSearchParams((_searchParams) => {
      _searchParams.set("page", _page.toString());
      return _searchParams;
    });
  };

  const transactionsSearchParams = TransactionsSearchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const { isPending, isError, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["transactions", transactionsSearchParams],
    queryFn: () => getTransactions(transactionsSearchParams),
    retry: shouldRetry,
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return <div>There is no data yet</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const { items, pageSize, total } = data;

  return (
    <div>
      <Header isFetching={isFetching} />
      <TransactionsFilter />
      <hr />
      <div className={isPlaceholderData ? "disabled" : ""}>
        <div className="transactions-list-container">
          {items.length > 0 ? (
            items.map((item) => <TransactionItem key={item.id} data={item} />)
          ) : (
            <div>The list is empty</div>
          )}
        </div>
      </div>
      <hr />
      <Pagination
        pageSize={pageSize}
        total={total}
        page={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}
