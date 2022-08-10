import React from 'react';
import { useRouter } from 'next/router'

import Button from '../common/Button';
import { ROUTES } from '../routes';
import CONSTANTS from '../../constants';

import styles from './Transactions.module.css';

const Transactions = () => {
  const router = useRouter()
  const handleNavigateToSend = () => {
    router.push(ROUTES.SEND)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>My Ethereum addresses</div>
      <div className={styles.cardBody}>
        <div className={styles.transactionItem}>
          <h3 className={styles.address}>0xeb34a91523a687930f7244e76407952c5b239707</h3>
          <h2 className={styles.amount}>0.04793 <span>ETH</span></h2>
        </div>
        <div className={styles.transactionItem}>
          <h3 className={styles.address}>0xeb34a91523a687930f7244e76407952c5b239707</h3>
          <h2 className={styles.amount}>0.04793 <span>ETH</span></h2>
        </div>
        <div className={styles.transactionItem}>
          <h3 className={styles.address}>0xeb34a91523a687930f7244e76407952c5b239707</h3>
          <h2 className={styles.amount}>0.04793 <span>ETH</span></h2>
        </div>
        <div className={styles.transactionItem}>
          <h3 className={styles.address}>0xeb34a91523a687930f7244e76407952c5b239707</h3>
          <h2 className={styles.amount}>0.04793 <span>ETH</span></h2>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <p>Please copy the address from which you wish to send money.</p>
        <Button text={CONSTANTS.NEXT} onClick={handleNavigateToSend} />
      </div>
    </div>
  )
}

export default Transactions