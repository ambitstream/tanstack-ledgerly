import { useQuery } from "@tanstack/react-query";
import { TransactionsSchema } from "../schema/transactions";

const getTransactions = async () => {
  const response = await fetch("/api/transactions");

  if (!response.ok) throw new Error("Response error");

  const data = await response.json();

  try {
    TransactionsSchema.parse(data);
  } catch (error) {
    console.error("Transaction validation failed:", error);
  }
  return data;
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
