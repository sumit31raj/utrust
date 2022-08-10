import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./TransactionSuccess.module.css";
import { ITransactionData } from "../../interfaces";
import constants from "../../constants";

const TransactionSuccess = () => {
  const [transactionData, setTransactionData] = useState<ITransactionData>(constants.FORM);
  const router = useRouter();

  useEffect(() => {
    const transaction = sessionStorage.getItem("transactionData");
    if (transaction) {
      setTransactionData(JSON.parse(transaction));
    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Transaction complete</div>
      <div className={styles.cardBody}>
        <div className={styles.cashImage}>
          <img src="/cash.svg" alt="Cash" />
        </div>
        <div className={styles.amountSummary}>
          <h4>You sent</h4>
          <h1>{transactionData?.amount} ETH</h1>
          <div className={styles.border}></div>
        </div>
        <div className={styles.transactionFlow}>
          <div className={styles.from}>
            <h5>From</h5>
            <p>{transactionData?.from}</p>
          </div>
          <div className={styles.to}>
            <h5>To</h5>
            <p>{transactionData?.to}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
