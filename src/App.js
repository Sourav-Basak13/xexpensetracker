import ExpenseTracker from "./components/ExpenseTracker/ExpenseTracker";
import WebWrapper from "./layout/WebWrapper/WebWrapper";
import "./App.css";
import Transactions from "./components/Transactions/Transactions";
import TopExpenses from "./components/TopExpenses/TopExpenses";
import { useEffect, useState } from "react";
import { TotalContext } from "./context/TotalContext";
import Home from "./pages/Home/Home";

function App() {
  const _balance = useState(
    JSON.parse(localStorage.getItem("balance")) ?? "5000"
  );
  const _expense = useState("0");
  const _expenses = useState(
    JSON.parse(localStorage.getItem("expenses")) ?? []
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      let totalExpense =
        Array.isArray(_expenses[0]) &&
        _expenses[0]?.reduce((acc, expense) => {
          return acc + expense?.price;
        }, 0);
      _expense[1](String(totalExpense));
    }
  }, [_expenses[0]]);

  useEffect(() => {
    _expenses[0] &&
      localStorage.setItem("expenses", JSON.stringify(_expenses[0]));
    _balance[0] && localStorage.setItem("balance", _balance[0]);
  }, [_balance[0], _expenses[0]]);
  return (
    <TotalContext.Provider
      value={{
        _balance,
        _expense,
        _expenses,
      }}
    >
      <Home />
    </TotalContext.Provider>
  );
}

export default App;
