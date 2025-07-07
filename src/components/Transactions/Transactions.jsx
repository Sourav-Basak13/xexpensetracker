import React, { useContext, useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import { TotalContext } from "../../context/TotalContext";
import ReactPaginate from "react-paginate";
import "react-paginate/theme/basic/react-paginate.css";

function Transactions() {
  const { _expenses } = useContext(TotalContext);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 3;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(_expenses[0].slice(itemOffset, endOffset));
    setPageCount(Math.ceil(_expenses[0].length / 3));
  }, [itemOffset, _expenses[0]]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % _expenses[0].length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className={styles.transactions_wrapper}>
      {!_expenses[0].length && (
        <p className={styles.no_transaction_list}>No transactions!</p>
      )}
      {!!_expenses[0].length &&
        !!currentItems?.length &&
        currentItems?.map((_ele) => (
          <TransactionCard key={_ele._id} {..._ele} />
        ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel="→"
        previousLabel="←"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageClassName={styles.pageItem}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.navItem}
        previousLinkClassName={styles.navLink}
        nextClassName={styles.navItem}
        nextLinkClassName={styles.navLink}
        activeClassName={styles.active}
      />
    </div>
  );
}

export default Transactions;
