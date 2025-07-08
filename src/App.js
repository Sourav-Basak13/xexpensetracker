import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import WebWrapper from "./layout/WebWrapper/WebWrapper";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import TopExpenses from "./components/TopExpenses/TopExpenses";
import { useEffect, useState } from "react";
import { TotalContext } from "./context/TotalContext";

function App() {
  const _balance = useState("5000");
  const _expense = useState("0");
  const _expenses = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    _expenses[1](JSON.parse(localStorage.getItem("expenses")));
    _balance[1](JSON.parse(localStorage.getItem("balance")));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      _expenses[0] &&
        localStorage.setItem("expenses", JSON.stringify(_expenses[0]));
      _balance[0] && localStorage.setItem("balance", _balance[0]);
    }
  }, [_balance[0], _expenses[0], isMounted]);
  return (
    <TotalContext.Provider
      value={{
        _balance,
        _expense,
        _expenses,
      }}
    >
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
    </TotalContext.Provider>
  );
}

export default App;
