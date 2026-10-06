import { STATUS_LABELS_MAP, CATEGORY_LABELS_MAP } from "./constants";
import { StatusSchema, CategorySchema } from "./schema";
import type { Status, Category } from "./schema";

export function TransactionsFilter({
  status,
  category,
  onFilterChange,
}: {
  status: Status | undefined;
  category: Category | undefined;
  onFilterChange: (name: "status" | "category", value: string) => void;
}) {
  return (
    <div className="d-flex">
      <div className="m-r">Filter by:</div>
      <div className="m-r">Status</div>
      <select
        className="m-r"
        onChange={(e) => onFilterChange("status", e.target.value)}
        value={status || ""}
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
        onChange={(e) => onFilterChange("category", e.target.value)}
        value={category || ""}
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
