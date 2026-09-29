import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "./api";
import { shouldRetry } from "../../api/shouldRetry";

export function TransactionsList() {
  const { isPending, isError, data, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    retry: shouldRetry,
  });

  if (isPending) {
    return <div>There is no data yet</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {data.length > 0 ? (
        data.map((item) => <div key={item.id}>{item.description}</div>)
      ) : (
        <div>The list is empty</div>
      )}
    </div>
  );
}
