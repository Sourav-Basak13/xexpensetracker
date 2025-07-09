import React, { useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PiPizza } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";
import { CiRollingSuitcase } from "react-icons/ci";
import { GiCancel } from "react-icons/gi";
import { GrFormEdit } from "react-icons/gr";
import styles from "./TransactionCard.module.css";
import { dayJsExtend } from "../../lib/functions/date.lib";
import { TotalContext } from "../../context/TotalContext";
import CustomModal from "../../ui/CustomModal/CustomModal";
import CustomInput from "../../ui/CustomInput/CustomInput";
import Button from "../../ui/Button/Button";
import { options } from "../../config/constant";
import { enqueueSnackbar } from "notistack";

function TransactionCard({ _id, title, price, category, date }) {
  const { _balance, _expense, _expenses } = useContext(TotalContext);
  const [formData, setFormData] = useState({
    _id,
    title,
    price,
    category,
    date,
  });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEditTransaction = useCallback(
    (event) => {
      event.preventDefault();
      if (+_balance[0] + price < +formData.price) {
        enqueueSnackbar({
          variant: "error",
          message: "You can't expened more than balance",
        });
        setFormData({
          _id,
          title,
          price,
          category,
          date,
        });
      } else {
        let expenses = [...JSON.parse(localStorage.getItem("expenses"))];

        expenses = expenses?.map((expense) => {
          if (expense._id === formData._id) {
            return formData;
          }
          return expense;
        });

        localStorage.setItem("expenses", JSON.stringify(expenses));
        localStorage.setItem("balance", _balance[0] - +formData.price);
        _balance[1]((prev) => +prev + +price - +formData.price);
        _expense[1]((prev) => +prev - +price + +formData.price);
        _expenses[1]((prev) => [...expenses]);
        enqueueSnackbar({
          variant: "success",
          message: "Expense is updated",
        });
      }
      // setFormData({
      //   _id: "",
      //   title: "",
      //   price: "",
      //   category: "",
      //   date: "",
      // });
      setOpen(false);
    },
    [formData]
  );

  const handleDeleteTransaction = (id) => {
    let expenses = [...JSON.parse(localStorage.getItem("expenses"))];

    expenses = expenses?.filter((expense) => expense._id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("balance", _balance[0] + +formData.price);
    _balance[1]((prev) => +prev + +formData.price);
    _expense[1]((prev) => +prev - +formData.price);
    _expenses[1]((prev) => [...expenses]);
    enqueueSnackbar({
      variant: "success",
      message: "Expense is deleted",
    });
    setOpenDelete(false);
  };

  return (
    <div className={styles.transaction_card_wrapper}>
      <div className={styles.transaction_item}>
        {category === "Food" && <PiPizza className={styles.card_icon} />}
        {category === "Entertainment" && (
          <IoGiftOutline className={styles.card_icon} />
        )}
        {category === "Travel" && (
          <CiRollingSuitcase className={styles.card_icon} />
        )}
        <div className={styles.transaction_item_title_date}>
          <p className={styles.transaction_item_title}>{title}</p>
          {/* {title} */}
          <p className={styles.transaction_item_date}>
            {dayJsExtend(date).format("MMM DD, YYYY")}
          </p>
        </div>
      </div>
      <div className={styles.transaction_price_actions}>
        <p className={styles.transaction_price}>₹{price}</p>
        <div className={styles.transaction_actions}>
          <GiCancel
            className={styles.transaction_actions_delete}
            onClick={() => setOpenDelete(true)}
          />

          <GrFormEdit
            className={styles.transaction_actions_edit}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <CustomModal
        className={styles.expense_modal}
        open={open}
        close={() => setOpen(false)}
      >
        <form onSubmit={handleEditTransaction}>
          <h2 className={styles.expense_modal_title}>Edit Expenses</h2>
          <div
            className={`${styles.expense_modal_content} ${styles.edit_content}`}
          >
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
              <option className={styles.expense_input_option} value="" disabled>
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
              Update Expense
            </Button>
            <Button
              className={styles.expense_cancel}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CustomModal>
      <CustomModal
        className={styles.expense_modal}
        open={openDelete}
        close={() => setOpenDelete(false)}
      >
        <>
          <h2 className={styles.expense_modal_title}>Delete Expenses</h2>
          <p className={styles.expense_modal_text}>
            Are you sure want to delete expence?
          </p>
          <div
            className={`${styles.expense_modal_content} ${styles.delete_confirm_content}`}
          >
            <Button
              type="button"
              className={styles.expense_add}
              onClick={() => handleDeleteTransaction(formData._id)}
            >
              Delete
            </Button>
            <Button
              className={styles.expense_cancel}
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </Button>
          </div>
        </>
      </CustomModal>
    </div>
  );
}

export default TransactionCard;
