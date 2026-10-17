import type { Transaction } from "./schema";

const statusClass = {
  SUCCESS: "success",
  FAILED: "alert",
  PENDING: "warning",
};

export function TransactionItem({
  data,
  onPress,
}: {
  data: Transaction;
  onPress: () => void;
}) {
  const isOutcome = data.category === "OUTCOME";
  return (
    <>
      <div>{new Date(data.date).toISOString().split("T")[0]}:</div>
      <div className="link" onClick={onPress}>
        {data.description}
      </div>
      <div className={!isOutcome ? "success" : ""}>
        {isOutcome && "-"}
        {data.amount} {data.currency}
      </div>
      <div>
        <button className={`button m-l ${statusClass[data.status]}`} disabled>
          {data.status}
        </button>
      </div>
    </>
  );
}
