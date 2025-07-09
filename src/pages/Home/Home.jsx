import React from "react";
import WebWrapper from "../../layout/WebWrapper/WebWrapper";
import ExpenseTracker from "../../components/ExpenseTracker/ExpenseTracker";
import Transactions from "../../components/Transactions/Transactions";
import TopExpenses from "../../components/TopExpenses/TopExpenses";
import styles from "./Home.module.css";

function Home() {
  return (
    <WebWrapper>
      <h1 className={styles.expense_tracker_heading}>Expense Tracker</h1>
      <ExpenseTracker />
      <div className={styles.bottom_container}>
        <div className={styles.transactions_wrapper}>
          <h3 className={styles.transactions_heading}>Recent Transactions</h3>
          <Transactions />
        </div>
        <div className={styles.top_expenses_wrapper}>
          <h3 className={styles.top_expenses_heading}>Top Expenses</h3>
          <TopExpenses />
        </div>
      </div>
    </WebWrapper>
  );
}

export default Home;
