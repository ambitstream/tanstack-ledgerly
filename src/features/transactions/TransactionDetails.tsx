import { useQuery } from "@tanstack/react-query";
import { transactionDetailsQueryOptions } from "./queries";

export function TransactionDetails({ id }: { id: number }) {
  const { data } = useQuery(transactionDetailsQueryOptions(id));

  if (!data) {
    return null;
  }

  const isOutcome = data.category === "OUTCOME";
  return (
    <div className="details-holder">
      <div>{new Date(data.date).toISOString().split("T")[0]}:</div>
      <div>{data.description}</div>
      <div className={!isOutcome ? "success" : ""}>
        {isOutcome && "-"}
        {data.amount} {data.currency}
      </div>
      <div>{data.status}</div>
    </div>
  );
}
