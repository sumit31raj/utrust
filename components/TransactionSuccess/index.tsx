import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ITransactionData } from "../../interfaces";
import constants from "../../constants";
import Button from "../common/Button";
import { getStorage } from "../../service/storage";
import { ROUTES } from "../routes";

import styles from "./TransactionSuccess.module.css";

const TransactionSuccess = () => {
  const [transactionData, setTransactionData] = useState<ITransactionData>(constants.DEFAULT_TRANSACTION);
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push(ROUTES.HOME);
  };

  useEffect(() => {
    const transaction = getStorage(constants.TRANSACTION_DATA);
    if (transaction) {
      setTransactionData(transaction);
    } else {
      router.push(ROUTES.HOME);
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
          <div className={styles.item}>
            <h5>From</h5>
            <p>{transactionData?.from}</p>
          </div>
          <div className={styles.item}>
            <h5>To</h5>
            <p>{transactionData?.to}</p>
          </div>
          <div className={styles.item}>
            <h5>Transaction Hash</h5>
            <p>{transactionData?.txHash}</p>
          </div>
        </div>
        <div className={styles.homeButton}>
          <Button text={constants.HOME} onClick={handleNavigateHome} />
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
