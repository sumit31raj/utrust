import React, { useMemo, useState, useEffect } from "react";
import AddTransaction from "../AddTransaction";
import Layout from "../common/Layout";
import Transactions from "../Transactions";
import TransactionSuccess from "../TransactionSuccess";
import styles from "./MainWrapper.module.css";

const MainWrapper = () => {
  const [step, setStep] = useState(1);

  const handleMoveStep = (type: string) => {
    setStep((prevStep) => (type === "next" ? prevStep + 1 : prevStep - 1));
  };

  const renderToStep = () => {
    switch (step) {
      case 1:
        return <Transactions handleMoveStep={handleMoveStep} />;
      case 2:
        return <AddTransaction handleMoveStep={handleMoveStep} />;
      case 3:
        return <TransactionSuccess />;
      default:
        <></>;
    }
  };

  const stepData = useMemo(() => renderToStep(), [step]);

  return (
    <div className={styles.wrapper}>
      <Layout>{stepData}</Layout>
    </div>
  );
};

export default MainWrapper;
