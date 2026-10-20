import { TransactionsList } from "./features/transactions/TransactionsList";
import { TransactionPanel } from "./features/transactions/TransactionPanel";

function App() {
  return (
    <div className="layout">
      <TransactionsList />
      <TransactionPanel />
    </div>
  );
}

export default App;
