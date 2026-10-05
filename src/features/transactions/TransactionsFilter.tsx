import { useSearchParams } from "react-router";
import { STATUS_LABELS_MAP, CATEGORY_LABELS_MAP } from "./constants";
import { StatusSchema, CategorySchema } from "./schema";

export function TransactionsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "";
  const category = searchParams.get("category") || "";

  const setParam = (name: string, value: string) => {
    setSearchParams((_searchParams) => {
      if (!value) {
        _searchParams.delete(name);
      } else {
        _searchParams.set(name, value);
      }
      return _searchParams;
    });
  };

  return (
    <div className="d-flex">
      <div className="m-r">Filter by:</div>
      <div className="m-r">Status</div>
      <select
        className="m-r"
        onChange={(e) => setParam("status", e.target.value)}
        value={status}
      >
        <option value={""}>All</option>
        {StatusSchema.options.map((value) => (
          <option key={value} value={value}>
            {STATUS_LABELS_MAP[value]}
          </option>
        ))}
      </select>
      <div className="m-r">Category</div>
      <select
        className="m-r"
        onChange={(e) => setParam("category", e.target.value)}
        value={category}
      >
        <option value={""}>All</option>
        {CategorySchema.options.map((value) => (
          <option key={value} value={value}>
            {CATEGORY_LABELS_MAP[value]}
          </option>
        ))}
      </select>
    </div>
  );
}
