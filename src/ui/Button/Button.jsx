import React from "react";
import styles from "./Button.module.css";

function Button({ children, variant, onClick, className, type }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
