import { useQuery, useQueryClient, noop } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import {
  transactionListQueryOptions,
  transactionDetailsQueryOptions,
} from "./queries";
import { Header, Pagination, SearchBar } from "../../components";
import { TransactionItem } from "./TransactionItem";
import { TransactionsFilter } from "./TransactionsFilter";

import { TransactionsSearchParamsSchema } from "./schema";

export function TransactionsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const params = TransactionsSearchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const { page, status, category, search } = params;

  const onFilterChange = (name: string, value: string) => {
    setSearchParams((_searchParams) => {
      if (!value) {
        _searchParams.delete(name);
      } else {
        _searchParams.set(name, value);
      }
      _searchParams.set("page", "1");
      return _searchParams;
    });
  };

  const onPageChange = (_page: number) => {
    setSearchParams((_searchParams) => {
      _searchParams.set("page", _page.toString());
      return _searchParams;
    });
  };

  const onItemPress = (id: number) => {
    setSearchParams((_searchParams) => {
      _searchParams.set("selected", id.toString());
      return _searchParams;
    });
  };

  const { isPending, isError, data, isFetching, isPlaceholderData } = useQuery(
    transactionListQueryOptions(params),
  );

  const onPrefetch = (id: number) => {
    void queryClient.query(transactionDetailsQueryOptions(id)).catch(noop);
  };

  if (isPending || isError) {
    return (
      <div className="list-holder">
        <Header isFetching={isFetching} />
        <div>
          {isPending ? "Loading…" : isError ? "Something went wrong" : ""}
        </div>
      </div>
    );
  }

  const { items, pageSize, total } = data;

  return (
    <div className="list-holder">
      <Header isFetching={isFetching} />
      <div className="d-flex">
        <div className="flex-2">
          <TransactionsFilter
            status={status}
            category={category}
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="d-flex flex-1 justify-content-end">
          <SearchBar onFilterChange={onFilterChange} search={search || ""} />
        </div>
      </div>
      <hr />
      <div className={isPlaceholderData ? "disabled" : ""}>
        <div className="transactions-list-holder">
          <div className="transactions-list-container">
            {items.length > 0 ? (
              items.map((item) => (
                <TransactionItem
                  onPress={() => onItemPress(item.id)}
                  onPrefetch={() => onPrefetch(item.id)}
                  key={item.id}
                  data={item}
                />
              ))
            ) : (
              <div>The list is empty</div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <Pagination
        pageSize={pageSize}
        total={total}
        page={page}
        onPageChange={onPageChange}
      />
    </div>
  );
}
