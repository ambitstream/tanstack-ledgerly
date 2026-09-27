
import { useQuery } from '@tanstack/react-query';

type Item = {
  userId: number;
  id: number;
  title: string;
}

const getTransactions = async (): Promise<Item[]> => {
    const response = await fetch('/api/transactions');

    if (!response.ok) throw new Error();

    return await response.json();
}

function List() {
  const { isPending, isError, data, isFetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions
  });

  if (isPending) {
    return (
      <div>There is no data yet</div>
    );
  }

  if (isError) {
    return (
      <div>Something went wrong</div>
    )
  }

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {data.length > 0 ? data.map((item) =>
        <div key={item.id}>{item.title}</div>
      ) : <div>The list is empty</div>}
    </div>
  )
}

export default List;