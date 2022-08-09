import React from 'react';
import styles from './AddTransaction.module.css'

const AddTransaction = () => {
  return (
    <div className={styles.transactions}>
      <img src="/Logo.svg" alt="Log" />
      <div className={styles.card}>
        <div className={styles.cardTitle}>Please fill the form to send Ethereum</div>
        <div className={styles.cardBody}>
          <form>
            <div className={styles.field}>
              <label htmlFor="from">From</label>
              <input type="text" id='from' name="from" placeholder="Your Address" />
            </div>
            <div className={styles.field}>
              <label htmlFor="to">To</label>
              <input type="text" id='to' name="to" placeholder="Destination Address" />
            </div>
            <div className={styles.field}>
              <label htmlFor="address">From</label>
              <input type="text" name="address" placeholder="Amount" className={styles.amountInput} />
            </div>
            <div className={styles.submitButton}>
              <input type="submit" className={styles.submit} value="Send" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTransaction