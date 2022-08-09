import React from 'react'
import AddTransaction from '../AddTransaction';
import Transactions from '../Transactions';
import TransactionSuccess from '../TransactionSuccess';
import styles from "./MainWrapper.module.css";

const MainWrapper = () => {

  return (
    <div className={styles.wrapper}>
      {/* <Transactions /> */}
      {/* <AddTransaction /> */}
      <TransactionSuccess />
    </div>
  )
}

export default MainWrapper