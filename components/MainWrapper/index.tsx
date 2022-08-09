import React, { useState } from "react";
import AddTransaction from "../AddTransaction";
import Layout from "../common/Layout";
import Transactions from "../Transactions";
import TransactionSuccess from "../TransactionSuccess";
import styles from "./MainWrapper.module.css";

const MainWrapper = () => {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.wrapper}>
      <Layout>
        <Transactions />
        {/* <AddTransaction /> */}
        {/* <TransactionSuccess /> */}
      </Layout>
    </div>
  );
};

export default MainWrapper;
