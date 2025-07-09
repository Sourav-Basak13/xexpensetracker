import React, { useCallback, useContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";
import Button from "../../ui/Button/Button";
import styles from "./ExpenseCard.module.css";
import CustomModal from "../../ui/CustomModal/CustomModal";
import CustomInput from "../../ui/CustomInput/CustomInput";
import { TotalContext } from "../../context/TotalContext";
import { options } from "../../config/constant";

function ExpenseCard({ text, type, balance, setBalance, expense, setExpense }) {
  const { _balance, _expense, _expenses } = useContext(TotalContext);
  const [extraBalance, setExtraBalance] = useState(0);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    price: "",
    category: "",
    date: "",
  });
  const [open, setOpen] = useState(false);

  const handleAddExpense = useCallback(
    (event) => {
      event.preventDefault();
      if (+_balance[0] < +formData.price) {
        enqueueSnackbar({
          variant: "error",
          message: "You can't expened more than balance",
        });
      } else {
        const newExpense = { ...formData, _id: uuidv4() };
        let expenses = [
          ...(JSON.parse(localStorage.getItem("expenses")) || []),
        ];
        expenses.push(newExpense);
        _balance[1]((prev) => +prev - +formData.price);
        _expense[1]((prev) => +prev + +formData.price);
        _expenses[1]((prev) => [...expenses]);
      }
      setFormData({
        _id: "",
        title: "",
        price: "",
        category: "",
        date: "",
      });
      setOpen(false);
    },
    [formData]
  );

  const handleAddBalance = (event) => {
    _balance[1]((prev) => +prev + +event.target[0].value);
    setExtraBalance(0);
    setOpen(false);
  };

  return (
    <div className={styles.expense_card}>
      <p className={styles.expense_card_text}>
        {/* Wallet Balance:{" "} */}
        {text}:{" "}
        <span
          className={`${styles.expense_card_sub_text} ${styles.text_success}`}
        >
          {type === "income" ? _balance[0] : _expense[0]}
        </span>
      </p>

      {type === "income" && (
        <Button
          variant={type === "income" ? "success" : "error"}
          onClick={() => setOpen(true)}
          className={styles.expense_card_btn}
        >
          + Add Income
        </Button>
      )}
      {type !== "income" && (
        <Button
          variant={type === "income" ? "success" : "error"}
          onClick={() => setOpen(true)}
          className={styles.expense_card_btn}
        >
          + Add Expense
        </Button>
      )}
      <CustomModal
        className={styles.expense_modal}
        open={open}
        close={() => setOpen(false)}
      >
        {type === "expense" && (
          <form onSubmit={handleAddExpense}>
            <h2 className={styles.expense_modal_title}>Add Expenses</h2>
            <div className={styles.expense_modal_content}>
              <CustomInput
                type="text"
                name="title"
                placeholder="Title"
                className={styles.expense_input}
                value={formData.title}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
                required
              />
              <CustomInput
                type="text"
                name="price"
                placeholder="Price"
                className={styles.expense_input}
                value={formData.price}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: +event.target.value,
                  }))
                }
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
                className={styles.expense_input_select}
                style={formData.category ? { color: "var(--base-black)" } : {}}
                required
              >
                <option
                  className={styles.expense_input_option}
                  value=""
                  disabled
                >
                  Select Category
                </option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    className={styles.expense_input_option}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <CustomInput
                type="date"
                placeholder="mm/dd/yyyy"
                name="date"
                value={formData.date}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    date: event.target.value,
                  }))
                }
                className={styles.expense_input}
                style={!formData.date ? { color: "#919191" } : {}}
                required
              />

              <Button type="submit" className={styles.expense_add}>
                Add Expense
              </Button>
              <Button
                className={styles.expense_cancel}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        {type === "income" && (
          <form onSubmit={handleAddBalance}>
            <h2 className={styles.expense_modal_title}>Add Balance</h2>
            <div
              className={styles.expense_modal_content}
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              <input
                type="number"
                name="balance"
                placeholder="Income Amount"
                className={`${styles.expense_input} ${styles.expense_balance_input}`}
                value={extraBalance}
                onChange={(event) =>
                  setExtraBalance((prev) => event.target.value)
                }
                required
              />
              <Button
                className={`${styles.expense_add} ${styles.expense_add_balance}`}
                type="submit"
              >
                Add Balance
              </Button>
              <Button
                className={styles.expense_cancel}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CustomModal>
    </div>
  );
}

export default ExpenseCard;
