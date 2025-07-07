import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import WebWrapper from "./layout/WebWrapper/WebWrapper";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import TopExpenses from "./components/TopExpenses/TopExpenses";

function App() {
  localStorage.setItem("expenses", JSON.stringify([]));
  localStorage.setItem("balance", "5000");
  return (
    <WebWrapper>
      <h1 className="expense_tracker_heading">Expense Tracker</h1>
      <ExpenseTracker />
      <div className="bottom_container">
        <div className="transactions_wrapper">
          <h3 className="transactions_heading">Recent Transactions</h3>
          <Transactions />
        </div>
        <div className="top_expenses_wrapper">
          <h3 className="top_expenses_heading">Top Expenses</h3>
          <TopExpenses />
        </div>
      </div>
    </WebWrapper>
  );
}

export default App;
