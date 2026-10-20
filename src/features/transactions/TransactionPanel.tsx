import { useSearchParams } from "react-router";
import { TransactionDetailsSchema } from "./schema";
import { TransactionDetails } from "./TransactionDetails";

export function TransactionPanel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = TransactionDetailsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const onClosePanel = () => {
    setSearchParams((_searchParams) => {
      _searchParams.delete("selected");
      return _searchParams;
    });
  };

  const id = params.selected;

  if (!id) {
    return <div className="details-holder" />;
  }

  return (
    <div className="details-holder">
      <TransactionDetails id={id} onClose={onClosePanel} />
    </div>
  );
}
