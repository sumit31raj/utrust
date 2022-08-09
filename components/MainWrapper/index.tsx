import React from 'react'
import Transactions from '../Transactions';
import styles from "./MainWrapper.module.css";

const MainWrapper = () => {
  return (
    <div className={styles.wrapper}>
      <Transactions />
    </div>
  )
}

export default MainWrapper