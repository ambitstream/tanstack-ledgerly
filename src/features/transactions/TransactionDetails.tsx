import { useQuery } from "@tanstack/react-query";
import { transactionDetailsQueryOptions } from "./queries";
import { HttpError } from "../../api/httpError";

export function TransactionDetails({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const { isPending, isError, data, isFetching, error, refetch } = useQuery(
    transactionDetailsQueryOptions(id),
  );

  const is404 = error instanceof HttpError && error.status === 404;

  const renderStatus = () => {
    if (isPending) {
      return <div>Loading…</div>;
    }
    if (is404) {
      return <div>Transaction not found</div>;
    }
    return (
      <div className="d-flex">
        <div className="flex-1">Something went wrong</div>
        <button className="button" onClick={() => refetch()}>
          Try again
        </button>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="d-flex">
        <div className="flex-1 d-flex">
          <h2>Details</h2>
          {isFetching && <div>⌛</div>}
        </div>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    );
  };

  if (isPending || isError) {
    return (
      <>
        {renderHeader()}
        {renderStatus()}
      </>
    );
  }

  const isOutcome = data.category === "OUTCOME";

  return (
    <>
      {renderHeader()}
      <div>Date: {new Date(data.date).toISOString().split("T")[0]}:</div>
      <div>Description: {data.description}</div>
      <div className={!isOutcome ? "success" : ""}>
        Amount: {isOutcome && "-"}
        {data.amount} {data.currency}
      </div>
      <div>Status: {data.status}</div>
    </>
  );
}
