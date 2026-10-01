export function Header({ isFetching }: { isFetching: boolean }) {
  return (
    <div className="d-flex">
      <h2>Ledgerly</h2>
      {isFetching && <div>⌛</div>}
    </div>
  );
}
