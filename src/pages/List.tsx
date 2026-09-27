
import { useQuery } from '@tanstack/react-query';

type Item = {
  userId: number;
  id: number;
  title: string;
}

const getTransactions = async (): Promise<Item[]> => {
  const response = await fetch('/api/transactions');
  return await response.json();
}

function List() {
  const { isPending, error, status, data, isFetching } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions
  });

  if (isPending) {
    return (
      <div>There is no data yet</div>
    );
  }

  if (error || status !== 'success') {
    return (
      <div>Something went wrong</div>
    )
  }

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {data && data.length > 0 ? data.map((item) =>
        <div key={item.id}>{item.title}</div>
      ) : ''}
    </div>
  )
}

export default List;