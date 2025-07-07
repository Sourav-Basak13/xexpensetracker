import React from "react";
import ReactModal from "react-modal";
import styles from "./CustomModal.module.css";

function CustomModal({ open, close, className, children }) {
  return (
    <ReactModal
      isOpen={open}
      contentLabel="Minimal Modal Example"
      className={`${styles.expense_card_modal} ${className}`}
    >
      {children}
    </ReactModal>
  );
}

export default CustomModal;
