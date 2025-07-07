import React, { useState } from "react";
import styles from "./WebWrapper.module.css";
import { TotalContext } from "../../context/TotalContext";

function WebWrapper({ children }) {
  const _balance = useState("5000");
  const _expense = useState("0");
  const _expenses = useState([]);
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
