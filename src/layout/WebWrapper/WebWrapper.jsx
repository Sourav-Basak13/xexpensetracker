import React from "react";
import styles from "./WebWrapper.module.css";

function WebWrapper({ children }) {
  return <div className={styles.webwrapper}>{children}</div>;
}

export default WebWrapper;
