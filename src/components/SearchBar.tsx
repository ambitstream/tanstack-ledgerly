import { useEffect, useEffectEvent, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export function SearchBar({
  onFilterChange,
  search,
}: {
  onFilterChange: (name: "search", value: string) => void;
  search: string;
}) {
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedValue = useDebounce(localSearch, 500);

  const handleDebouncedChange = useEffectEvent((value: string) => {
    if (search !== value) {
      onFilterChange("search", value);
    }
  });

  useEffect(() => {
    handleDebouncedChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="d-flex">
      Search:
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="m-l"
      />
    </div>
  );
}
