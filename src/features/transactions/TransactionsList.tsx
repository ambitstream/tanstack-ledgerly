import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getTransactions } from "./api";
import { shouldRetry } from "../../api/shouldRetry";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { DEFAULT_PAGE_SIZE } from "../../constants";

export function TransactionsList() {
  const [page, setPage] = useState(1);

  const { isPending, isError, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["transactions", page, DEFAULT_PAGE_SIZE],
    queryFn: () => getTransactions({ page, pageSize: DEFAULT_PAGE_SIZE }),
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
      <div className={isPlaceholderData ? "disabled" : ""}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              {item.id}: {item.description}
            </div>
          ))
        ) : (
          <div>The list is empty</div>
        )}
      </div>
      <Pagination
        pageSize={pageSize}
        total={total}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
}
