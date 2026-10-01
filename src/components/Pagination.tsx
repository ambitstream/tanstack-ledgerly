export function Pagination({
  pageSize,
  total,
  page,
  onPageChange,
}: {
  pageSize: number;
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}) {
  if (total === 0) return null;

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="d-flex align-items-center m-t m-b">
      <button
        disabled={page <= 1}
        className="button m-r"
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      {new Array(totalPages).fill(0).map((_, i) => {
        const isCurrent = i + 1 === page;
        return (
          <button
            key={i}
            disabled={isCurrent}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(i + 1)}
            className={`button m-r ${isCurrent ? "active" : ""}`}
          >
            {i + 1}
          </button>
        );
      })}
      <button
        disabled={page >= totalPages}
        className="button m-r"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
      <div className="m-l">
        {page}/{totalPages}
      </div>
    </div>
  );
}
