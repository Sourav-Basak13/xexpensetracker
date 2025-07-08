import React, { useEffect, useState } from "react";
import styles from "./WebWrapper.module.css";
import { TotalContext } from "../../context/TotalContext";

function WebWrapper({ children }) {
  const _balance = useState("5000");
  const _expense = useState("0");
  const _expenses = useState([]);
  useEffect(() => {
    _expenses[1](JSON.parse(localStorage.getItem("expenses")));
    _balance[1](JSON.parse(localStorage.getItem("balance")));
  }, []);

  useEffect(() => {
    _expenses[0] &&
      localStorage.setItem("expenses", JSON.stringify(_expenses[0]));
    _balance[0] && localStorage.setItem("balance", _balance[0]);
  }, [_balance[0], _expenses[0]]);
  return (
    <div className={styles.webwrapper}>
      <TotalContext.Provider
        value={{
          _balance,
          _expense,
          _expenses,
        }}
      >
        {children}
      </TotalContext.Provider>
    </div>
  );
}

export default WebWrapper;
