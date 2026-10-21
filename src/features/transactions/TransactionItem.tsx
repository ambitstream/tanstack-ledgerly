import { useEffect, useRef } from "react";
import type { Transaction, Status } from "./schema";

const statusClass: Record<Status, string> = {
  SUCCESS: "success",
  FAILED: "alert",
  PENDING: "warning",
};

const HOVER_PREFETCH_DELAY = 300;

export function TransactionItem({
  data,
  onPress,
  onPrefetch,
}: {
  data: Transaction;
  onPress: () => void;
  onPrefetch: () => void;
}) {
  const isOutcome = data.category === "OUTCOME";

  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onMouseEnter = () => {
    timer.current = setTimeout(() => {
      onPrefetch();
    }, HOVER_PREFETCH_DELAY);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <div>{new Date(data.date).toISOString().split("T")[0]}:</div>
      <button
        className="link"
        onClick={onPress}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => clearTimeout(timer.current)}
        onFocus={onPrefetch}
      >
        {data.description}
      </button>
      <div className={!isOutcome ? "success" : ""}>
        {isOutcome && "-"}
        {data.amount} {data.currency}
      </div>
      <div>
        <span className={`button m-l ${statusClass[data.status]}`}>
          {data.status}
        </span>
      </div>
    </>
  );
}
