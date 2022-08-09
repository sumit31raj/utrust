import React from "react";
import styles from "./TransactionSuccess.module.css";

const TransactionSuccess = () => {
  return (
    <div className={styles.transactions}>
      <img src="/Logo.svg" alt="Log" />
      <div className={styles.card}>
        <div className={styles.cardTitle}>Transaction complete</div>
        <div className={styles.cardBody}>
          <div className={styles.cashImage}>
            <img src="/cash.svg" alt="Cash" />
          </div>
          <div className={styles.amountSummary}>
            <h4>You sent</h4>
            <h1>0.76849 ETH</h1>
            <div className={styles.border}></div>
          </div>
          <div className={styles.transactionFlow}>
            <div className={styles.from}>
              <h5>From</h5>
              <p>0xeb34a91523a687930f7244e76407952c5b239707</p>
            </div>
            <div className={styles.to}>
              <h5>To</h5>
              <p>0xeb34a91523a687930f7244e76407952c5b239707</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
