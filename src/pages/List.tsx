import { useQuery } from "@tanstack/react-query";
import { type Transaction } from "../types/transaction.types";

const getTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch("/api/transactions");

  if (!response.ok) throw new Error("Response error");

  return await response.json();
};

function List() {
  const { isPending, isError, data, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
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

export default List;
