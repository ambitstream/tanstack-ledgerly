import { useSearchParams } from "react-router";
import { TransactionDetailsSchema } from "./schema";
import { TransactionDetails } from "./TransactionDetails";

export function TransactionPanel() {
  const [searchParams] = useSearchParams();

  const params = TransactionDetailsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const id = params.selected;

  if (!id) {
    return null;
  }

  return <TransactionDetails id={id} />;
}
