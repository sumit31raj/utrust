import React from 'react'
import AddTransaction from '../AddTransaction';
import Transactions from '../Transactions';
import styles from "./MainWrapper.module.css";

const MainWrapper = () => {

  return (
    <div className={styles.wrapper}>
      {/* <Transactions /> */}
      <AddTransaction />
    </div>
  )
}

export default MainWrapper